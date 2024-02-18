import { NextResponse } from "next/server";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const fs = require('fs');
const path = require('path');
import { db } from "@/firebase/firebase";
import libreofficeConvert from "libreoffice-convert";
import { promisify } from 'util';
import { log } from "console";




export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("file");
    let name=formData.get("name");
    
    const _uuid = formData.get("_uuid");
    const fgrade = formData.get("fgrade");
    const fschool = formData.get("fschool");
    name = name.split(/\.(docx|doc)$/)[0] + '.pdf';
    libreofficeConvert.convertAsync = promisify(libreofficeConvert.convert);
    const ext = '.pdf';
    const docxBuf = await file.arrayBuffer();
    
    try {
        const docxBufNode = Buffer.from(docxBuf);
        let pdfBuf = await libreofficeConvert.convertAsync(docxBufNode, ext, undefined);
     
        
        // Upload converted PDF file to Firebase Storage
        const reference=ref(db, `files/${_uuid}`);
        const uploadTask = uploadBytesResumable(reference, pdfBuf);

        // Wait for upload task to complete and get download URL
        await new Promise((resolve) => {
            uploadTask.on("state_changed", (snapshot) => {}, (err) => {}, () => resolve());
         });
         
         // Get download URL after upload task completes
         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
         
         // Prepare response data with file details and download URL
         const fileData={
             fname:name,
             fsize:file.size,
             _fid:_uuid,
             furl:downloadURL,
             fgrade:fgrade,
             fschool:fschool
          };
console.log(downloadURL);
          return NextResponse.json(fileData);
          
     } catch (error) {
        return NextResponse.json({message:"Error converting file"},{status:500});
        
     }
}