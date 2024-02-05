import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const {standard} = await req.json();
    connectMongoBD();
    let datalist = await User.find({standard})
    return NextResponse.json( datalist ,{ status: '200' })
}