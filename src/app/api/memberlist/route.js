import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    return NextResponse.json({ status: "ok" })
}
export async function POST(req) {
    const user = await req.json()
    if (user.role) {
        let datalist = await User.find({ standard: user?.grade, role: user?.role })
        return NextResponse.json({ datalist }, { status: '200' })
    }
    let datalist = await User.find({ standard: user?.grade })
    return NextResponse.json({ datalist }, { status: '200' })
}