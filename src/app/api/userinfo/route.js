import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req) {
    try {
        await connectMongoBD();
        const { email } = await req.json();
        const user = await User.findOne({ email })
        if (user == null) {
            return NextResponse.json({ user: null })
        }
        return NextResponse.json({ user })
    } catch (error) {
        console.log(error)
    }
}