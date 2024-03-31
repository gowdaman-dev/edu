import { connectMongoBD } from "@/app/lib/mongodb";
import { fileStatus } from "@/app/models/status";
import {NextResponse} from 'next/server'
export async function GET(req) {
    console.log("from api/status/get");
 
    try {   const {searchParams:idObj}= new URL(req.url)
        await connectMongoBD()
       
        const data=await fileStatus.find().where('id').equals(idObj.get('id'))
        return NextResponse.json(data, { status: 200 })

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({  error: error.message}, { status: 400 })
    }
}

