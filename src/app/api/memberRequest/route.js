import User from "../../models/user";
import MemberRequest from "../../models/MemberRequest";
import { NextResponse } from "next/server";
import { connectMongoBD } from "@/app/lib/mongodb";

export async function POST(req) {
    const { userName,
        email,
        schoolName,
        role,
        grade,
        comment } = await req.json();
    try {
        await connectMongoBD()
        const user = await User.findOne({ email });
        if (!user) {
            await MemberRequest.create({
                name: userName,
                email: email,
                schoolname: schoolName,
                role: role,
                grade: grade,
                description: comment,
            });
            return NextResponse.json({ message: "Member request created successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


