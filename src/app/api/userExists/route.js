import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req){
    try{
        await connectMongoBD();
        const {email} = await req.json();
        console.log(email);
        const user = await User.findOne({email}).select("_id")
        console.log(user);
        if (user != null){
            return NextResponse.json({user} , {status:200})
        }
        return NextResponse.json({message:'email not exits'}, {status:400})
    }catch(error){
        console.log(error)
    }
}