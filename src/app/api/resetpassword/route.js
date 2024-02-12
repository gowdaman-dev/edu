import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoBD } from "@/app/lib/mongodb";
import { mailOption, transporter } from '@/app/components/mailcomponent/nodemailer';

export async function PUT(req) {
    const { _id, password , email, name  } = await req.json()
    console.log({ _id, password });
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoBD();
    const resetpass = await User.findByIdAndUpdate(_id, { password: hashedPassword });
    if (resetpass) {
        try {
            const data = await transporter.sendMail({
                ...mailOption,
                to: email,
                subject: "Password reset Successfull",
                text: 'edulearn service',
                html: `<!DOCTYPE html><html lang="en"><head></head><body><div class="container"><img src="http://edulearnuln.vercel.app/_next/image?url=%2Fmailimg.jpg&w=1920&q=75" alt=""><h1>hello ${name}</h1><p>Thanks for using our eductional web service. Your email ${email}, Your Password as been resetted successfully!</p><a href=${process.env.NEXTAUTH_URL}signin>sign in now </a></div> <style> body {font-family: sans-serif;} img {width: 100%;} p {text-align: center;font-weight: 300;color: rgb(34, 34, 34);} h1 {font-size: 2rem;color: purple;} .container {height: 500px;width: 100%;background-color: white;border-radius: 2rem;display: flex;flex-direction: column;align-items: center;}</style></body></html>`
            })
        } catch (error) {
            console.log(error)
        }
        return NextResponse.json({ resetpass }, { status: 200 })
    }
    return NextResponse.json({ message: 'error' }, { status: 200 })
}