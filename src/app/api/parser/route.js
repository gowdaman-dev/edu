import { NextResponse } from "next/server";
import PdfParse from "pdf-parse/lib/pdf-parse";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "@/firebase/firebase";
import axios from "axios";
export async function POST(req) {
    const data = await req.formData();
    const file = data.get('pdf');
    const buffer = await file.arrayBuffer()
    console.log("/api/parse");
    try {
        if (buffer) {

            const text = (await PdfParse(buffer)).text
            return NextResponse.json({ text: text }, { status: 200 })
        }






        return NextResponse.json({ messagae: "there is an error with getting pdf" }, { status: 400 })


    } catch (error) {
        console.log(error);
        return NextResponse.json({ messagae: "something wrong in text Extraction" }, { status: 500 })

    }
}