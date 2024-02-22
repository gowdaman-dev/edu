import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoBD } from "@/app/lib/mongodb";
import OrganizerRequest from "@/app/models/OrganizerRequest";
import { AccountAcceptReject } from "@/app/components/mailertemplate/accrej";
export async function POST(req) {
    const { accid, event } = await req.json();
    await connectMongoBD()
    const user = OrganizerRequest.findById(accid)
    try {
        if (event === 0) {
            console.log('delet');
            AccountAcceptReject({email:user.email , status:false})
            await OrganizerRequest.findByIdAndDelete(accid)
            return NextResponse.json({ message: 'Member request deleted successfully' });
        }
        if (event === 1) {
            const { name, email, schoolname, grade, role } = await OrganizerRequest.findById(accid);
            const hashedpassword = await bcrypt.hash("Admin@1234", 10);
            const newUser = await User.create({ name, email, password: hashedpassword, school: schoolname, standard:grade, role });
            if (newUser) {
                await OrganizerRequest.findByIdAndDelete(accid);
            }
            AccountAcceptReject({email:user.email , status:false})
            return NextResponse.json({ message: 'User created and member request deleted successfully' });
        } else {
            return NextResponse.json({ message: 'Invalid event value' }, 400);
        }
    } catch (error) {
        console.error('Error processing member request event:', error);
        return NextResponse.json({ message: 'Internal server error' }, 500);
    }
};



