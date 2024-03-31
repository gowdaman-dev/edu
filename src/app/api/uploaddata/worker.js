import { id } from "./taskinitiator";
import axios from "axios"
import { AssemblyAI } from 'assemblyai';
import { connectMongoBD } from "@/app/lib/mongodb";
import { fileStatus } from "@/app/models/status";
import libFiles from '@/app/models/libFiles'

import PdfParse from "pdf-parse/lib/pdf-parse";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db } from "@/firebase/firebase";
export default async function worker() {
    try {
        console.log(id);
        const pdf = await getDownloadURL(ref(db, `files/${id[0]}`));
        console.log(pdf);
        const text = (await PdfParse(pdf)).text
        console.log(text);
        Gtts(text, id[0])
    } catch (error) {
        console.log(error.message);
    }



}



async function Gtts(text, fid) {
    await connectMongoBD()
    console.log('tts start');
    const voices = ['A', 'F', 'J', 'H']
    for (let index = 0; index < voices.length; index++) {
        const voice = voices[index]

    
        let downloadURL = ""
        console.log("GTTS", text.length);
        if (text.length > 2500) {
            let textres = ''
            let tempinit = 0
            let tempfinal = 2500
            let buffer = ""
            let len = text.length
            while (tempfinal <= len) {
                try {
                    const verify = text.charAt(tempfinal)
                    if (verify != ' ') {
                        console.log("last char :", verify, "\n\n");
                        tempfinal++
                        continue;
                    }
                    console.log('last chat :', verify);
                    const slicer = text.slice(tempinit, tempfinal)
                    let config = {

                        "audioConfig": {
                            "audioEncoding": "MP3",
                            "effectsProfileId": [
                                "handset-class-device"
                            ],
                            "pitch": 0,
                            "speakingRate": 1
                        },
                        "input": {
                            "text": slicer
                        },
                        "voice": {
                            "languageCode": "en-US",
                            "name": `en-US-Standard-${voice}`
                        }

                    }
                    const response = await axios.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.GOOGLE_TTS}`, config)
                    const audbuffer = response.data.audioContent
                    console.log('buffer 1 written');
                    buffer += audbuffer
                    console.log("buffer length", buffer.length);
                    console.log("current:", tempfinal, "of", len);
                    textres += slicer
                    if ((tempfinal + 2500) > len) {
                        console.log('limit hitted');
                        const finalslice = text.slice(tempfinal, len)
                        let config = {

                            "audioConfig": {
                                "audioEncoding": "MP3",
                                "effectsProfileId": [
                                    "handset-class-device"
                                ],
                                "pitch": 0,
                                "speakingRate": 1
                            },
                            "input": {
                                "text": finalslice
                            },
                            "voice": {
                                "languageCode": "en-US",
                                "name": `en-US-Standard-${voice}`
                            }

                        }
                        const response = await axios.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.GOOGLE_TTS}`, config)
                        const audbuffer = response.data.audioContent
                        console.log('buffer 1 written');

                        buffer += audbuffer
                        tempfinal = len
                        textres += finalslice
                    }
                    else {
                        tempinit = tempfinal
                        tempfinal = tempfinal + 2500
                    }
                } catch (error) {
                    console.log("err at :", tempfinal, error.message);
                    continue;
                }
            }
            console.log("final:", len, 'actual:', textres.length);
            const blob = new Blob([Buffer.from(buffer, 'base64')], { type: 'audio/mp3' });
            const bufferAudio = await blob.arrayBuffer()
            const storageRef = ref(db, `audio/${fid}${voice}`);
            const upload = await uploadBytesResumable(storageRef, bufferAudio)
            downloadURL = await getDownloadURL(upload.ref);
            console.log(voice, ' completed');
            await fileStatus.updateOne({id:fid},{$push:{audio:index+1}})
            console.log('transcript start');

     

            const client = new AssemblyAI({
                apiKey: process.env.ASSEMBLY_AI_APIKEY,
            });
            const data = {
                audio_url: downloadURL,

            }
            const transcript = await client.transcripts.create(data);
            const jsonString = JSON.stringify(transcript);
            const blobTranscript = Buffer.from(jsonString, 'utf-8');
            const reference = ref(db, `transcript/${fid}${voice}`)
            const uploadTranscript = await uploadBytesResumable(reference, blobTranscript)
            await getDownloadURL(uploadTranscript.ref);
            console.log(voice, 'Transcript completed');
            await fileStatus.updateOne({id:fid},{$push:{transcript:index+1}})





        } else {
            try {
                let config = {

                    "audioConfig": {
                        "audioEncoding": "MP3",
                        "effectsProfileId": [
                            "handset-class-device"
                        ],
                        "pitch": 0,
                        "speakingRate": 1
                    },
                    "input": {
                        "text": text
                    },
                    "voice": {
                        "languageCode": "en-US",
                        "name": `en-US-Standard-${voice}`
                    }


                }
                const response = await axios.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.GOOGLE_TTS}`, config)
                const audbuffer = response.data.audioContent


                const blob = new Blob([Buffer.from(audbuffer, 'base64')], { type: 'audio/mp3' });
                const bufferAudio = await blob.arrayBuffer()
                const storageRef = ref(db, `audio/${fid}${voice}`);
                const upload = await uploadBytesResumable(storageRef, bufferAudio)
                downloadURL = await getDownloadURL(upload.ref);
            await fileStatus.updateOne({id:fid},{$push:{audio:index+1}})

                console.log('transcript start');
                //
                console.log('transcript start');

                const client = new AssemblyAI({
                    apiKey: process.env.ASSEMBLY_AI_APIKEY,
                });
                const data = {
                    audio_url: downloadURL,

                }
                const transcript = await client.transcripts.create(data);
                const jsonString = JSON.stringify(transcript);
                const blobTranscript = Buffer.from(jsonString, 'utf-8');
                const reference = ref(db, `transcript/${fid}${voice}`)
                const uploadTranscript = await uploadBytesResumable(reference, blobTranscript)
                await getDownloadURL(uploadTranscript.ref);
                console.log(voice, 'Transcript completed');
            await fileStatus.updateOne({id:fid},{$push:{transcript:index+1}})



            } catch (e) {

                console.log(e);
            }
        }

        


    }
    const finalStatus=   await fileStatus.updateOne({id:fid},{status:"completed"})
   await libFiles.updateOne({file_id:fid},{file_status:"completed"})


    id.shift()
    if (id.length != 0) {

        worker()
    }
}