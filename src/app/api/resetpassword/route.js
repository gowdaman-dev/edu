import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(req){
    const {id , password} = await req.json()
    const resetpass = User.findByIdAndUpdate({_id:id}, {password});
    if(resetpass){
        return NextResponse.json({resetpass},{status:200})
    }
    return NextResponse.json({message:'error'},{status:500})
}