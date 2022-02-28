const nodemailer = require('nodemailer')

//mailer
const transporter  =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "3c3bd45235c836",
      pass: "d42d8c30f0d9fc",
    },
  });

  module.exports = transporter;