import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const {reqfrom} = await req.json();
    if(reqfrom == "superadmin"){
        connectMongoBD();
        let datalist = await User.find({role: { $nin: ['superadmin'] }})
        return NextResponse.json( datalist ,{ status: '200' })
    }
    else{
        return NextResponse.json({error:"Access denied"},{status:500})
    }
}