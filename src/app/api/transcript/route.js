import { NextResponse } from "next/server"
import { AssemblyAI } from 'assemblyai';
import { db } from "@/firebase/firebase";
import { ref,getDownloadURL ,uploadBytesResumable} from "firebase/storage";
export async function POST(req){
    try{

        const {URL,fid}=await req.json()
        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLY_AI_APIKEY,
          });
          const data = {
            audio_url: URL,
           
          }
          const transcript = await client.transcripts.create(data);
          const jsonString = JSON.stringify(transcript);
          const blob = Buffer.from(jsonString, 'utf-8'); 
        const reference = ref(db,`transcript/${fid}`)
        const upload = await uploadBytesResumable(reference, blob)
        const downloadURL = await getDownloadURL(upload.ref);
        return NextResponse.json({url:downloadURL},{status:200})
                  
    }
  catch(e){
    return NextResponse.json({message:"transcription failure try after some time"},{status: 500})
  }

}