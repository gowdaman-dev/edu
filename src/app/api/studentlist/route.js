import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const { school } = await req.json();
    connectMongoBD();
    let datalist = await User.find({ school, role: { $nin: ['admin', 'superadmin', 'teacher'] } })
    return NextResponse.json(datalist, { status: '200' })
}