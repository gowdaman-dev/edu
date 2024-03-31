import { NextResponse } from 'next/server'
import { taskinitiator } from './taskinitiator';
import { connectMongoBD } from "@/app/lib/mongodb";
import { fileStatus } from "@/app/models/status";
export async function POST(req) {

    try {
        const { data } = await req.json()
        await connectMongoBD()
        await fileStatus.create({id:data})
        taskinitiator(data)



        return NextResponse.json({ message: "success" }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ error: "error" }, { status: 500 });
    }
}
