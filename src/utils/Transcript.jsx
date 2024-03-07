"use server"
import { AssemblyAI } from 'assemblyai';
import { db } from "@/firebase/firebase";
import { ref,getDownloadURL ,uploadBytesResumable} from "firebase/storage";
export async function getTrans(url,fid){
   
console.log("transcript");
        const URL=url
        const FID=fid
        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLY_AI_APIKEY,
          });
          const data = {
            audio_url: URL,
           
          }
          const transcript = await client.transcripts.create(data);
          const jsonString = JSON.stringify(transcript);
          const blob = Buffer.from(jsonString, 'utf-8'); 
        const reference = ref(db,`transcript/${FID}`)
        console.log(transcript);
        const upload = await uploadBytesResumable(reference, blob)
        const downloadURL = await getDownloadURL(upload.ref);
        console.log("transcript upload",downloadURL);
        return downloadURL
                  
    
 

}