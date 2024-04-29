const express = require("express")
const dotenv = require('dotenv').config()
const app = express()
const connectDB = require('./config/db')
const colors = require("colors")
const twilio = require("twilio")
const cookieParser = require('cookie-parser')

let cors = require("cors")

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// api
app.use("/api/user",require("./route/UserAuthRoute"))
app.use("/api/contact",require("./route/contactRouter"))
app.use("/api/incident",require("./route/incidentRoute"))
app.use("/api/post",require("./route/postRouter"))

// twillo
// const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

// app.post("/send-sms",(req,res)=>{
//     const {to,message} = req.body

//     client.messages.create({body:message,from:process.env.TWILIO_NUMBER,to:to})
//     .then((message)=>{
//         return res.send({success:"SMS sent Successfully",message})
//     })
//     .catch((err)=>{
//         res.status(500).send(err);
//     })
// })

app.listen(3000,()=>{
    console.log("And it begins")
})

// console.log(process.env.MONGO_URI)

connectDB()