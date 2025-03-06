const nodemailer = require("nodemailer");
<<<<<<< HEAD
=======
const dotenv = require("dotenv").config();
>>>>>>> upstream/main

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    let info = await transporter.sendMail({
      from: `"Mingle" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // recipient
      subject: `${title}`, // Subject
      html: `${body}`, // HTML content
    });

<<<<<<< HEAD
    console.log(info.response);
    return info;
  } catch (error) {
    console.log(error.message);
=======
    // console.log(info.response);
    return info;
  } catch (error) {
    // console.log(error.message);
>>>>>>> upstream/main
    return error.message;
  }
};

// ✅ Correct export
module.exports = mailSender;

