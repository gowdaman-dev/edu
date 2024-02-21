import MemberRequest from "@/app/models/MemberRequest";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoBD } from "@/app/lib/mongodb";
export async function POST(req) {
    const { accid, event } = await req.json();
    await connectMongoBD()
    try {
        if (event === 0) {
            await MemberRequest.findByIdAndDelete(accid);
            return NextResponse.json({ message: 'Member request deleted successfully' });
        }
        if (event === 1) {
            const { name, email, schoolname, grade, role } = await MemberRequest.findById(accid);
            const hashedpassword = await bcrypt.hash("Test@1234", 10);
            const newUser = await User.create({ name, email, password: hashedpassword, school: schoolname, standard:grade, role });
            if (newUser) {
                await MemberRequest.findByIdAndDelete(accid);
            }
            return NextResponse.json({ message: 'User created and member request deleted successfully' });
        } else {
            return NextResponse.json({ message: 'Invalid event value' }, 400);
        }
    } catch (error) {
        console.error('Error processing member request event:', error);
        return NextResponse.json({ message: 'Internal server error' }, 500);
    }
};



