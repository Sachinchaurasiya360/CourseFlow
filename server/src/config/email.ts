const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

export const sendEmail = async ( { to, subject, body }: { to: string; subject: string; body: string }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "gmail",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const sendingEmail = await transporter.sendMail({
      from: "CourseFlow",
      to: to,
      subject: subject,
      html: body,
    });
  } catch (error) {
    console.error(error);
  }
};