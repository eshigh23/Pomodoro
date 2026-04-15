require('dotenv').config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

transporter.verify()
  .then(() => console.log("Server is ready to take our messages"))
  .catch((err) => console.error("Verification failed:", err));

module.exports = transporter