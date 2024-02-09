import { connectMongoBD } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from 'bcryptjs'
import School from "@/app/models/AddOrganisation";
export async function POST(req) {
    try {
        const { name, email, password, role, school, about } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoBD();
        await User.create({ name, email, password: hashedPassword, role, school, about });
        await School.create({ schoolname: school, organiseremail: email, organisertype: about })
        return NextResponse.json({ message: "admin registered" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error occoured while registering admin" },
            { status: 500 }
        );
    }
}