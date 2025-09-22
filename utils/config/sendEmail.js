const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

 const sendEmail = async (to, subject, body) => {
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
      text: body ,
    });

  } catch (error) {
    console.error(error);
  }
};
module.exports={sendEmail}