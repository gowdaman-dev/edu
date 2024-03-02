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
                html: `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset</h2>
        <p>Hello,</p>
        <p>You have requested to reset your password for the Miway community.</p>
        <p>To proceed with the password reset, please click the following link:</p>
        <p><a href="${process.env.NEXTAUTH_URL+"resetpassword/"+_id}">Reset Password</a></p>
        <p>If you did not request this password reset, you can safely ignore this email.</p>
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