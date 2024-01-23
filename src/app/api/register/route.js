import { connectMongoBD } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from 'bcryptjs'
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password , 10)
    await connectMongoBD();
    await User.create({ name, email, password:hashedPassword });
    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occoured while registering user" },
      { status: 500 }
    );
  }
}
