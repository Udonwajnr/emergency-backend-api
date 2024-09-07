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

app.listen(3000,()=>{
    console.log("And it begins")
})

connectDB()