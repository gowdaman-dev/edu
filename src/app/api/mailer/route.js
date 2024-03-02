import { mailOption, transporter } from '@/app/components/mailcomponent/nodemailer';
export async function POST(req) {
    try {
        const { id, email, name } = await req.json()
        const link = `${process.env.NEXTAUTH_URL}resetpassword/${id}`
        const data = await transporter.sendMail({
            ...mailOption,
            to: email,
            subject: 'change Password',
            text: 'edulearn service',
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Password</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Change Password</h2>
        <p>Hello,</p>
        <p>You have requested to change your password for the Miway community.</p>
        <p>To proceed with the password reset, please click the following link:</p>
        <p><a href="${link}">Change Password</a></p>
        <p>If you did not request this password reset, you can safely ignore this email.</p>
        <p>Thank you,<br> The Miway Team</p>
    </div>
</body>
</html>

            `
        })
        console.log(data.response)
        return Response.json({});
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'error' });
    }
}
export async function PUT(req) {
    try {
        const { id, email, name , message , subject } = await req.json()
        const link = `${process.env.NEXTAUTH_URL}signin`
        const data = await transporter.sendMail({
            ...mailOption,
            to: email,
            subject: subject,
            text: 'edulearn service',
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
        <p><a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Sign In</a></p>
        <p>If you did not initiate this password change, please contact our support team immediately.</p>
        <p>Thank you,<br> The Miway Team</p>
    </div>
</body>
</html>

            `
        })
        console.log(data.response)
        return Response.json({});
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'error' });
    }
}
