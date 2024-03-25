"use server"
import React from 'react'
import axios from "axios"
import { db } from '@/firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
async function Gtts(text, fid) {
  console.log("GTTS",text.length);

const config={
    
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
          "name": "en-US-Standard-D"
        }
      
}

  const response=await axios.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.GOOGLE_TTS}`,config)
  const blob = new Blob([Buffer.from(response.data.audioContent, 'base64')], { type: 'audio/mp3' });  
  const storageRef = ref(db, `audio/${fid}`);
            const upload = await uploadBytesResumable(storageRef, blob)
         let  downloadURL = await getDownloadURL(upload.ref);
           console.log(downloadURL);

           return downloadURL;
}

export default Gtts