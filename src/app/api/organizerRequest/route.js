import User from "../../models/user";
import OrganizerRequest from "../../models/OrganizerRequest";
import { NextResponse } from "next/server";
import { connectMongoBD } from "@/app/lib/mongodb";
import School from "@/app/models/AddOrganisation";

export async function POST(req) {
    const { name, email, schoolname, role, description } = await req.json();
    await connectMongoBD()
    try {
        const user = await User.findOne({ email });
        const existingEmailRequest = await OrganizerRequest.findOne({ email });
        const existingSchool = await School.findOne({ schoolname });
        const existingSchoolRequest = await OrganizerRequest.findOne({ schoolname });
        if(`${existingSchool}`.toLowerCase === `${existingSchool}`.toLowerCase()){
            console.log(existingSchool);
            return NextResponse.json({ message: "School already exists" }, { status: 400 });
        }
        if (existingEmailRequest) {
            return NextResponse.json({ message: "Request with this email already exists" }, { status: 400 });
        }
        if (existingSchoolRequest) {
            return NextResponse.json({ message: "Request with this school already exists" }, { status: 400 });
        }
        const existingUser = await User.findOne({ school:schoolname });
        if (existingUser) {
            return NextResponse.json({ message: "School already exists" }, { status: 400 });
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
        const allMemberRequests = await OrganizerRequest.find()
        if (allMemberRequests == null){
            return NextResponse.json(allMemberRequests, { status: 400 });
        }
        return NextResponse.json(allMemberRequests, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({}, { status: 500 });
    }
}
