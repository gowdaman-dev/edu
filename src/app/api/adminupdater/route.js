import { connectMongoBD } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
export async function PUT(req) {
  try {
    const data = await req.formData();
    const id = await data.get('id')
    const name = await data.get('name')
    const email = await data.get('email')
    const school = await data.get('school')
    const oldschool = await data.get('oldschool')
    const standard = await data.get('grade')
    console.log(id, name, email, school, oldschool)
    await connectMongoBD();
    await User.findByIdAndUpdate(id, { name, email, school, standard });
    return NextResponse.json({ message: "transmition complete" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error occoured while registering user" },
      { status: 500 }
    );
  }
}
