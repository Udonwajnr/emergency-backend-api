const dotenv = require('dotenv').config()
const nodemailer = require("nodemailer")
  
const sendingOtp=async(params)=>{
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
      "to": `${params.user}`, // list of receivers
      "subject": 'Welcome to Emergency Response Coordination system', // Subject line
      "html": `
      <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Welcome to the Emergency Response Coordination system.</h2>
      
      <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.otp}</h1>
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

  module.exports={sendingOtp}