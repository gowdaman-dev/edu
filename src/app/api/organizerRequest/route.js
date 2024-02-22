import User from "../../models/user";
import OrganizerRequest from "../../models/OrganizerRequest";
import { NextResponse } from "next/server";
import { connectMongoBD } from "@/app/lib/mongodb";

export async function POST(req) {
    const { name, email, schoolname, role, description } = await req.json();
    await connectMongoBD()
    try {
        const user = await User.findOne({ email });
        const existingEmailRequest = await OrganizerRequest.findOne({ email });
        const existingSchoolRequest = await OrganizerRequest.findOne({ schoolname });
        if (existingEmailRequest) {
            return NextResponse.json({ message: "Request with this email already exists" }, { status: 400 });
        }
        if (existingSchoolRequest) {
            return NextResponse.json({ message: "Request with this school already exists" }, { status: 400 });
        }
        const existingUser = await User.findOne({ school:schoolname });
        if (existingUser) {
            return NextResponse.json({ message: "School already exists in the database" }, { status: 400 });
        }
        if (!user) {
            await OrganizerRequest.create({ name, email, schoolname, role, description });
            return NextResponse.json({ message: "Organizer request created successfully" }, { status: 201 });
        } else {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}

export async function PUT() {
    try {
        await connectMongoBD();
        const allOrganizerRequests = await OrganizerRequest.find()
        return NextResponse.json(allOrganizerRequests, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({}, { status: 500 });
    }
}
