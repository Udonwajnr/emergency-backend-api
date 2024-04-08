const dotenv = require('dotenv').config()
const nodemailer = require("nodemailer")

const sendingResetPasswordLink=async(params)=>{
    let config = {
      service: 'gmail', // your email domain
      host:"smtp",
      port:587,
      secure:false,
      auth: {
          user: process.env.NODEJS_GMAIL_APP_USER, // your email address
          pass: process.env.NODEJS_GMAIL_APP_PASSWORD // your password
       }
    }
  
    let transporter = nodemailer.createTransport(config)
    let message = {
      "from": 'udonwajnr10@gmail.com', // sender address
      "to": "umohu67@gmail.com", // list of receivers
      "subject": 'Reset password', // Subject line
      "html": `
      <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Password Reset</h2>
      <p style="margin-bottom: 30px;">Reset your Password</p>
      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.link}</h1>
    </div>
      
      `, // html body
      "text":"Dear Recipient, thank you for subscribing",
  };
  transporter.sendMail(message).then((info) => {
      console.log("sent")
  }).catch((error)=>{
    console.log(error)
  })
  }

  module.exports={sendingResetPasswordLink}