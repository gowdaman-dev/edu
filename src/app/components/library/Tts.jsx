'use server'

import { getAudioBuffer } from "simple-tts-mp3";
import { db } from '@/firebase/firebase';
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage';
export const getAudio = async (text,fid) => {
    console.log(text);
    if (text.length > 2500) {
        let textres = ''
        let tempinit = 0
        let tempfinal = 2500
        let buffer = []
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
                const audbuffer = await getAudioBuffer(slicer)
                buffer.push(audbuffer)
                console.log("buffer length", buffer.length);
                console.log("current:", tempfinal, "of", len);
                textres += slicer
                if ((tempfinal + 2500) > len) {
                    console.log('limit hitted');
                    const finalslice = text.slice(tempfinal, len)
                    const audbuffer = await getAudioBuffer(finalslice)
                    buffer.push(audbuffer)
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
        const blob = new Blob(buffer, { type: 'audio/mp3' })
        blob.arrayBuffer().then(async (data) => {
            const storageRef = ref(db, `audio/${fid}`);
            const upload = await uploadBytes(storageRef, data)
            const downloadURL = await getDownloadURL(upload.ref);
            console.log(downloadURL);
           
        })
    } else {
        try {

            const buffer = await getAudioBuffer(text);

            const blob = new Blob([buffer], { type: 'audio/mp3' })
            blob.arrayBuffer().then(async (data) => {
                const storageRef = ref(db, `audio/${fid}`);
                const upload = await uploadBytes(storageRef, data)
                const downloadURL = await getDownloadURL(upload.ref);
               
            })
        } catch (e) {

            console.log(e.message);
            getAudio()
        }
    }
}