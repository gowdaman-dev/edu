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
                        <p>Hi there ! your request from <strong>${user.email}</strong> for our educational service as been rejected by our Community</p>
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
                    <title>Document</title>
                </head>
                <body>
                    <h1>${webName}</h1>
                    <br>
                    <p>Hi there ! your request from <strong>${email}</strong> for our educational service as been approved by our Community</p>
                    <p>Email:${email}</p>
                    <p>Password:Admin@1234</p>
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



