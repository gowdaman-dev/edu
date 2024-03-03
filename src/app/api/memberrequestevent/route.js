import MemberRequest from "@/app/models/MemberRequest";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoBD } from "@/app/lib/mongodb";
import { transporter, mailOption } from "@/app/components/mailcomponent/nodemailer";
import { webName } from "@/app/components/globalDetails";
export async function POST(req) {
    const { accid, event } = await req.json();
    await connectMongoBD()
    const user = await MemberRequest.findById(accid).select('email')
    try {
        if (event === 0) {
            await transporter.sendMail({
                ...mailOption,
                to: `${user}`,
                subject: 'account rejection',
                text: 'MiWay service',
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Account Rejected</title>
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
                    <h2>Account Rejected</h2>
                    <p>Email ${user},</p>
                    <p>We regret to inform you that your account registration for the MiWay community has been rejected.</p>
                    <p>If you believe this was a mistake or if you have any questions, please feel free to contact us at <a href="mailto:Admin@1234">Admin@1234</a>.</p>
                    <p class="note">We appreciate your interest in joining our community.</p>
                    <p>Best regards,<br>The MiWay Team</p>
                  </div>
                </body>
                </html>
                `

            })
            await MemberRequest.findByIdAndDelete(accid);

            return NextResponse.json({ message: 'Member request deleted successfully' });
        }
        if (event === 1) {
            const { name, email, schoolname, grade, role } = await MemberRequest.findById(accid);
            await transporter.sendMail({
                ...mailOption,
                to: email,
                subject: 'account Approved',
                text: 'MiWay service',
                html: `
                <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Approved</title>
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
    .email {
      font-weight: bold;
      color: #007bff;
    }
    .password {
      font-style: italic;
      color: #888;
    }
    .note {
      color: #888;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome to MiWay Community!</h2>
    <p>Dear ${email},</p>
    <p>We are pleased to inform you that your account has been successfully approved in the MiWay community.</p>
    <p>Below are your login credentials:</p>
    <p>Email: <span class="email">${email}</span></p>
    <p>Password: <span class="password">Test@1234</span></p>
    <p class="note">Please keep your password confidential and do not share it with anyone.</p>
    <p class="note">If you have any questions or need assistance, feel free to reach out to us at <a href="${process.env.NEXTAUTH_URL}/signin">here</a>.</p>
    <p>Welcome aboard, and thank you for joining us!</p>
    <p>Best regards,<br>The MiWay Team</p>
  </div>
</body>
</html>
            `
            })
            const hashedpassword = await bcrypt.hash("Test@1234", 10);
            const newUser = await User.create({ name, email, password: hashedpassword, school: schoolname, standard: grade, role });
            if (newUser) {
                await MemberRequest.findByIdAndDelete(accid);
            }
            return NextResponse.json({ message: 'User created and member request deleted successfully' });
        } else {
            return NextResponse.json({ message: 'Invalid event value' }, 400);
        }
    } catch (error) {
        console.error('Error processing member request event:', error);
        return NextResponse.json({ message: 'Internal server error' }, 500);
    }
};



