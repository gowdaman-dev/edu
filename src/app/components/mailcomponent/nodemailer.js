import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"damangowdaman@gmail.com",
        pass:"iuep tmiv gegx shxf",
    }
})
export const mailOption = {
    from:"damangowdaman@gmail.com",
}