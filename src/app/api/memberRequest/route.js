import User from "../../models/user";
import MemberRequest from "../../models/MemberRequest";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data =await req.json();
    console.log(data);
    /*try {
        const user = await User.findOne({ email });

        if (!user) {
            await MemberRequest.create({
                name,
                email,
                schoolname,
                role,
                description,
            })
            return NextResponse.json({ message: "Member request created successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }*/
    return NextResponse.json({ message: "Member request created successfully" }, { status: 200 });
}


