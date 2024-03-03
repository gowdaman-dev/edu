import { connectMongoBD } from "@/app/lib/mongodb";
import School from "@/app/models/AddOrganisation";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req) {
    try {
        await connectMongoBD();
        const { school } = await req.json();
        const exist = await School.findOne({ schoolname: school }).select("_id")
        if (exist == null) {
            return NextResponse.json({}, { status: 400 })
        } else {
            return NextResponse.json({}, { status: 200 })
        }
    } catch (error) {
        console.log(error)
    }
}