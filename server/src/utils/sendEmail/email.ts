import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (email: string, subject: string, html: string) => {

    const { data, error } = await resend.emails.send({
        from: "CourseFlow <onboarding@resend.dev>",
        to: email,
        subject: subject,
        html: html

    })
    if (error) {
        throw new Error(error.message)
    }
    return { data, error }
}