import { NextResponse } from "next/server";
import PdfParse from "pdf-parse/lib/pdf-parse";
import { ref,getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/firebase";
import axios from "axios";
export async function POST (req){
   const {fname,fid}=await req.json()
   console.log("/api/parse");
   console.log(fname,fid);
try {
    if(fid){
        const reference = ref(db,`files/${fid}`)
        const URL=await getDownloadURL(reference)
        const pdfBuffer= await axios.get(URL,{responseType:"arraybuffer"})
        const text =(await PdfParse(pdfBuffer)).text
        return NextResponse.json({text:text,fid:fid},{status:200})
        
        
        
    }
    return NextResponse.json({messagae:"there is an error with getting id"},{status:400})


} catch (error) {
    console.log(error);
    return NextResponse.json({messagae:"something wrong in text Extraction"},{status:500})
    
}
}