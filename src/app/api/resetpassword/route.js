import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoBD } from "@/app/lib/mongodb";
import { mailOption, transporter } from '@/app/components/mailcomponent/nodemailer';

export async function PUT(req) {
    const { _id, password, email, name } = await req.json()
    console.log({ _id, password });
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoBD();
    const resetpass = await User.findByIdAndUpdate(_id, { password: hashedPassword });
    if (resetpass) {
        try {
            const data = await transporter.sendMail({
                ...mailOption,
                to: email,
                subject: "Password changed Successfull",
                text: 'Miway service',
                html: `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Changed Successfully</h2>
        <p>Hello,</p>
        <p>Your password for the Miway community has been successfully changed.</p>
        <p>You can now sign in using your new password.</p>
        <p><a href="${process.env.NEXTAUTH_URL+'signin'}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Sign In</a></p>
        <p>If you did not initiate this password change, please contact our support team immediately.</p>
        <p>Thank you,<br> The Miway Team</p>
    </div>
</body>
</html>

                `
            })
        } catch (error) {
            console.log(error)
        }
        return NextResponse.json({ resetpass }, { status: 200 })
    }
    return NextResponse.json({ message: 'error' }, { status: 200 })
}