import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { transporter, mailOption } from "@/app/components/mailcomponent/nodemailer";
export async function POST(req) {
    const { password, email } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const updater = await User.findOneAndUpdate({ email }, { password: hashedPassword })
    await transporter.sendMail({
        ...mailOption,
        to: email,
        subject: 'password changed successfully',
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Changed Successfully</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    h2 {
      color: #333;
    }
    p {
      color: #666;
    }
    .note {
      color: #888;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Changed Successfully</h2>
    <p>Email ${email},</p>
    <p>This is to inform you that your password has been changed successfully.</p>
    <p class="note">For security reasons, it's recommended to keep your password confidential and avoid sharing it with anyone.</p>
    <p>Thank you for your attention to this matter.</p>
    <p>Best regards,<br>The MiWay Team</p>
  </div>
</body>
</html>

        `
    })
    return NextResponse.json({ message: 'resetted' }, { status: 200 })
}