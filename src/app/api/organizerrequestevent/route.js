import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoBD } from "@/app/lib/mongodb";
import OrganizerRequest from "@/app/models/OrganizerRequest";
import School from "@/app/models/AddOrganisation";
import { webName } from "@/app/components/globalDetails";
import { transporter , mailOption } from "@/app/components/mailcomponent/nodemailer";
export async function POST(req) {
    const { accid, event } = await req.json();
    await connectMongoBD()
    const user = await  OrganizerRequest.findById(accid).select('email')
    try {
        if (event === 0) {
            await transporter.sendMail({
                ...mailOption,
                to:`${user}`,
                subject: 'account rejection',
                text: 'MiWay service',
                html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <h1>${webName}</h1>
                        <br>
                        <p>Hi there ! your request from <strong>${user}</strong> for our educational service as been rejected by our Community</p>
                    </body>
                    </html>
                `

            })
            await OrganizerRequest.findByIdAndDelete(accid);
            return NextResponse.json({ message: 'Member request deleted successfully' });
        }
        if (event === 1) {
            const { name, email, schoolname, role } = await OrganizerRequest.findById(accid);
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
    <p>Password: <span class="password">Admin@1234</span></p>
    <p class="note">Please keep your password confidential and do not share it with anyone.</p>
    <p class="note">If you have any questions or need assistance, feel free to reach out to us at <a href="${process.env.NEXTAUTH_URL}/signin">here</a>.</p>
    <p>Welcome aboard, and thank you for joining us!</p>
    <p>Best regards,<br>The MiWay Team</p>
  </div>
</body>
</html>

            `
            })
            const hashedpassword = await bcrypt.hash("Admin@1234", 10);
            const newUser = await User.create({ name, email, password: hashedpassword, school: schoolname, role: 'admin' });
            await School.create({ schoolname: schoolname, organiseremail: email, organisertype: role });
            if (newUser) {
                await OrganizerRequest.findByIdAndDelete(accid);
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



