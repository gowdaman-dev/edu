import { connectMongoBD } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(req) {
    const { standard, school, role } = await req.json();
    connectMongoBD();
    if (role == 'teacher') {
        let datalist = await User.find({ standard, school, role: { $nin: ['admin', 'superadmin', 'teacher'] } })
        return NextResponse.json(datalist, { status: '200' })
    } if(role == 'admin'){
        let datalist = await User.find({ standard, school, role: { $nin: ['admin', 'superadmin'] } })
        return NextResponse.json(datalist, { status: '200' })
    }
}