
import axios from "axios";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
const { NextResponse } = require('next/server')
export async function GET(req){
    console.log("api/files/pdf");
    const request=await req.url
const parsedUrl=parseUrl(request)
const queryParams = parsedUrl.query.url
    if(queryParams){
        

        try{
            const response=await axios.get(queryParams,{responseType:'arraybuffer'})
            const data=new Uint8Array(response.data)
            return NextResponse.json(data,{status:200})
        }catch(e){
            return NextResponse.json({message:"error on getting buffers"},{status: 500})
        }
    }
    return NextResponse.json({message:"query url not exist"})
}