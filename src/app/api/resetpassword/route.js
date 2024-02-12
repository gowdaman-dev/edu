import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoBD } from "@/app/lib/mongodb";

export async function PUT(req) {
    const { _id, password } = await req.json()
    console.log({ _id, password });
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoBD();
    const resetpass = await User.findByIdAndUpdate(_id, { password: hashedPassword });
    if (resetpass) {
        return NextResponse.json({ resetpass }, { status: 200 })
    }
    return NextResponse.json({ message: 'error' }, { status: 200 })
}