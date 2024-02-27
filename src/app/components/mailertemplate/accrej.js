const { transporter , mailOption} = require("../mailcomponent/nodemailer")

export const AccountAcceptReject =async ({email , status })=>{
    if (status){
        const mailer = await transporter.sendMail({
            ...mailOption,
            to: email,
            subject: 'account rejection',
            text: 'edulearn service',
            html: `<!DOCTYPE html><html lang="en"><head></head><body><div class="container"><img src="http://edulearnuln.vercel.app/_next/image?url=%2Fmailimg.jpg&w=1920&q=75" alt=""><h1>hello ${name}</h1><p>Thanks for using our eductional web service. Your email ${email}, you have requested our educational services was accepted </br>email:${email}</br>pass:${position === 'admin'?"Admin@1234":"Test@1234"}</p></div> <style> body {font-family: sans-serif;} img {width: 100%;} p {text-align: center;font-weight: 300;color: rgb(34, 34, 34);} h1 {font-size: 2rem;color: purple;} .container {height: 500px;width: 100%;background-color: white;border-radius: 2rem;display: flex;flex-direction: column;align-items: center;}</style></body></html>`
        
        })
    }
    if(!status){
        const mailer = await transporter.sendMail({
            ...mailOption,
            to: email,
            subject: 'Reset Password',
            text: 'edulearn service',
            html: `<!DOCTYPE html><html lang="en"><head></head><body><div class="container"><img src="http://edulearnuln.vercel.app/_next/image?url=%2Fmailimg.jpg&w=1920&q=75" alt=""><h1>hello ${name}</h1><p>Thanks for using our eductional web service. Your email ${email}, you have requested our educational services was rejected.</p></div> <style> body {font-family: sans-serif;} img {width: 100%;} p {text-align: center;font-weight: 300;color: rgb(34, 34, 34);} h1 {font-size: 2rem;color: purple;} .container {height: 500px;width: 100%;background-color: white;border-radius: 2rem;display: flex;flex-direction: column;align-items: center;}</style></body></html>`
        
        })
    }
}