"use server"
import axios from "axios"
import { db } from '@/firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

async function Gtts(text, fid,voice,speed) {
  const TEXT = text
  const FID = fid
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
            "speakingRate": speed
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
              "speakingRate": speed
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
    const storageRef = ref(db, `audio/${fid}`);
    const upload = await uploadBytesResumable(storageRef, bufferAudio)
    downloadURL = await getDownloadURL(upload.ref);
    console.log(downloadURL);
    return downloadURL;




  } else {
    try {
      let config = {

        "audioConfig": {
          "audioEncoding": "MP3",
          "effectsProfileId": [
            "handset-class-device"
          ],
          "pitch": 0,
          "speakingRate": speed
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
      const storageRef = ref(db, `audio/${fid}`);
      const upload = await uploadBytesResumable(storageRef, bufferAudio)
      downloadURL = await getDownloadURL(upload.ref);
      console.log(downloadURL);
      return downloadURL;



    } catch (e) {

      console.log(e.message);
      Gtts(TEXT, FID)
    }
  }



}





export default Gtts



/* 



 let downloadURL=""

  const response=await axios.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.GOOGLE_TTS}`,config)
  console.log(Buffer.from(response.data.audioContent));
  const blob = new Blob([Buffer.from(response.data.audioContent, 'base64')], { type: 'audio/mp3' });  
  const storageRef = ref(db, `audio/${fid}`);
            const upload = await uploadBytesResumable(storageRef, blob)
           downloadURL = await getDownloadURL(upload.ref);
           console.log(downloadURL);

           return downloadURL;
}
*/