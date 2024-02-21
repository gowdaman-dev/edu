import { connectMongoBD } from "@/app/lib/mongodb";
import School from "@/app/models/AddOrganisation";
import { NextResponse } from "next/server";
export async function PUT(req){
    const {school} = await req.json();
    await connectMongoBD();
    console.log(school);
    const schoolInfo = await School.findOne({ schoolname: school });
    console.log(schoolInfo);
    return NextResponse.json(schoolInfo,{status:200})
}