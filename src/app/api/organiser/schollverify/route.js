import { connectMongoBD } from "@/app/lib/mongodb";
import School from "@/app/models/AddOrganisation";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req){
    try{
        await connectMongoBD();
        const {school} = await req.json();
        const exist = await School.findOne({schoolname:school}).select("_id")
        return NextResponse.json({exist})
    }catch(error){
        console.log(error)
    }
}