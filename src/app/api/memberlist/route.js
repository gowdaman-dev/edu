import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
    connectMongoBD();
    let datalist = await User.find()
    return NextResponse.json( datalist ,{ status: '200' })
}