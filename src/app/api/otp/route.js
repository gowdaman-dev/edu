import { transporter, mailOption } from "@/app/components/mailcomponent/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { email } = await req.json();
    function generateRandom4DigitNumber() {
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        return randomNumber;
    }

    const otp = generateRandom4DigitNumber();
    await transporter.sendMail({
        ...mailOption,
        to: email,
        subject: 'Reset Password',
        text: "MiWay Community",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification</title>
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
            .otp {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
              margin-bottom: 20px;
            }
            .note {
              color: #888;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>OTP Verification</h2>
            <p>email: ${email},</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <p class="otp">${otp}</p>
            <p class="note">Please do not share this OTP with anyone. It is valid for a single use and will expire shortly.</p>
            <p>If you did not request this OTP, you can safely ignore this email.</p>
            <p>Thank you,<br>The MiWay Team</p>
          </div>
        </body>
        </html>
        `
    })
    return NextResponse.json({ otp }, { status: 200 })
}