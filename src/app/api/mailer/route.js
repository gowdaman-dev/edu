import { mailOption, transporter } from '@/app/components/mailcomponent/nodemailer';
import { resetpassword } from '@/app/components/mailcomponent/sendmain';
export async function POST(req) {
    try {
        const { id, email, name } = await req.json()
        const link = await `http://localhost:3000/resetpassword/${id}`
        const data = await transporter.sendMail({
            ...mailOption,
            to: email,
            subject: 'Reset Password',
            text: 'edulearn service',
            html: `<!DOCTYPE html><html lang="en"><head></head><body><div class="container"><img src="http://edulearnuln.vercel.app/_next/image?url=%2Fmailimg.jpg&w=1920&q=75" alt=""><h1>hello ${name}</h1><p>Thanks for using our eductional web service. Your email ${email}, you have requested to reset your password</p><p>To reset Your password <a href=${link}>click here</a></p></div> <style> body {font-family: sans-serif;} img {width: 100%;} p {text-align: center;font-weight: 300;color: rgb(34, 34, 34);} h1 {font-size: 2rem;color: purple;} .container {height: 500px;width: 100%;background-color: white;border-radius: 2rem;display: flex;flex-direction: column;align-items: center;}</style></body></html>`
        })
        console.log(data.response)
        return Response.json({});
    } catch (error) {
        console.log(error)
        return Response.json({ error: 'error' });
    }
}
