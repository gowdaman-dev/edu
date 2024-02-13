import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { NextResponse } from "next/server";

export async function GET(req){
    console.log("api/pdfbytes");
const request=await req.url
const parsedURL=parseUrl(request)
try {
    const URL=parsedURL.query.url
    const fetcher=await fetch(URL)
    const response=await fetcher.blob()
const buffer=await response.arrayBuffer()
const bytes=Buffer.from(buffer)
console.log(bytes);
return NextResponse.json({data:bytes})
    
} catch (error) {
    return NextResponse.json({message:"problem on data fetch" });
    
}
}