import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(req){
    await connectMongoBD();
    const {email} = await req.json();
    console.log(email)
    const userdata = await User.findOne({email})
    if (userdata){
        return NextResponse.json({userdata})
    }
    return NextResponse.json({error:"error"})
}
export async function GET(req){
    return NextResponse.json({error:"error"})
}