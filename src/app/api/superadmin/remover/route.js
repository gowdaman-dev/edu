import { connectMongoBD } from "@/app/lib/mongodb";
import School from "@/app/models/AddOrganisation";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        await connectMongoBD();
        const { role, school, id } = await req.json();
        if (role === 'admin') {
            await User.deleteMany({ school: school })
            await School.deleteMany({ schoolname: school })
            return NextResponse.json({ status: 'admin terminted' }, { status: 201 })
        }
        if (role == "student" || role == "teacher") {
            const userrecord = await User.findByIdAndDelete(id)
            if (userrecord) {
                return NextResponse.json({ status: 'account terminated' }, { status: 201 })
            }
            return NextResponse.json({ status: 'account already terminated' }, { status: 500 })
        }
    } catch (err) {
        console.log(err);
    }
}