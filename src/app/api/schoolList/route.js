import { connectMongoBD } from "@/app/lib/mongodb";
import School from "@/app/models/AddOrganisation";
import { NextResponse } from "next/server";
export async function PUT(req){
    await connectMongoBD();
    const school = await School.find().select('schoolname');
    return NextResponse.json(school , {status:200})
}