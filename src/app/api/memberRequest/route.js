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
    await connectMongoBD()
    try {
        const existingEmailRequest = await MemberRequest.findOne({ email });
        if (existingEmailRequest) {
            return NextResponse.json({ message: "Request with this email already exists" }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            await MemberRequest.create({
                name: userName,
                email,
                schoolname: schoolName,
                role,
                grade,
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

export async function PUT(req) {
    const { school, role } = await req.json();
    try {
        await connectMongoBD();
        if (!role) {
            const allMemberRequestsall = await MemberRequest.find({ schoolname: school });
            return NextResponse.json(allMemberRequestsall, { status: 200 });
        }
        const allMemberRequests = await MemberRequest.find({ schoolname: school, role });
        return NextResponse.json(allMemberRequests, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
