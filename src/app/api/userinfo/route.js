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
export async function PUT(req) {
    try {
        await connectMongoBD();
        const { id } = await req.json();
        const password = await User.findOne({ _id:id }).select('password')
        if (user == null) {
            return NextResponse.json({ user: null })
        }
        return NextResponse.json({ password })
    } catch (error) {
        console.log(error)
    }
}