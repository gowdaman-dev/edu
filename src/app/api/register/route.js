import { connectMongoBD } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from 'bcryptjs'
import School from "@/app/models/AddOrganisation";
export async function POST(req) {
  try {
    const { name, email, password, standard, school, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoBD();
    await User.create({ name, email, password: hashedPassword, school, standard, role });
    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occoured while registering user" },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    const data = await req.formData();
    const id = await data.get('id')
    const name = await data.get('name')
    const email = await data.get('email')
    const school = await data.get('school')
    const oldschool = await data.get('oldschool')
    const role = await data.get('role')
    await connectMongoBD();
    console.log(data);
    if(role == 'admin') {
      await User.findByIdAndUpdate(id , {school , name , email })
      await User.updateMany({ school: oldschool }, { school: school });
      await School.updateMany({ schoolname: oldschool }, { schoolname: school , organiseremail:email });
      return NextResponse.json({ message: "transmition complete" }, { status: 200 });
    }
    await User.findByIdAndUpdate(id, { name, email, school });
    return NextResponse.json({ message: "transmition complete" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error occoured while registering user" },
      { status: 500 }
    );
  }
}
