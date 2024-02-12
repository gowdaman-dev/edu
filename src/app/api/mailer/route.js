import { resetpassword } from '@/app/components/mailcomponent/sendmain';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export async function POST(req) {
    try {
        const { email, name, id } = await req.json()
        const { data, error } = await resend.emails.send({
            from: 'edulearn <onboarding@resend.dev>',
            to: email,
            subject: 'reset password',
            react: resetpassword({id , name , email})
        });
        if (error) {
            console.log(error);
        }
        console.log(id);
        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
