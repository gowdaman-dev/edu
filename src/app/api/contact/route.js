import { webName } from "@/app/components/globalDetails";
import { transporter , mailOption } from "@/app/components/mailcomponent/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.formData()
    transporter.sendMail({
        ...mailOption,
        to:"damangowdaman@gmail.com",
        subject:`Contact from ${data.get('email')}`,
        html:`
            <h1>${webName}</h1>
            <p>A mail from client</p>
            <p>name: ${data.get('name')}</p>
            <p>Email: ${data.get('email')}</p>
            <p>message: ${data.get('message')}</p>
            <style>
            h1{
                text-align:center;
                font-weight:900
                font-size:20px
            }
            </style>
        `
    })
    return NextResponse.json({message:'done'})
}