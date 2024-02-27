import { NextRequest, NextResponse } from "next/server";
import { getAudioBuffer } from "simple-tts-mp3";
import { ReadableStream } from "stream"

;export const config = {
    api: {
        responseLimit: '20mb',
        bodyParser: true, // Disable default body parsing
    },
}
export async function POST(req, res) {
    console.log("/api/audio");
   
    try {
      const data= await req.body
      console.log(data);
      return new NextResponse({}, { status: 200 }); // Return an error response if an exception occurs

    } catch (error) {
        console.error(error);
        return new NextResponse({}, { status: 200 }); // Return an error response if an exception occurs
    }

   /*  try {
        const buffer = await getAudioBuffer(text);
        const blob = new Blob([buffer], { type: 'audio/mp3' })
        const headers = new Headers();
        headers.set("Content-Type", "audio/mp3");
        console.log(blob.size);
        return new NextResponse(blob, { status: 200, statusText: "OK", headers });
    } catch (error) {
        console.log(error);
    } */

};
