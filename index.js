const express = require("express")
const dotenv = require('dotenv').config()
const app = express()
const connectDB = require('./config/db')
const colors = require("colors")

const cookieParser = require('cookie-parser')

let cors = require("cors")

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// api
app.use("/api/user",require("./route/UserAuthRoute"))


app.listen(3000,()=>{
    console.log("And it begins")

})
// console.log(process.env.MONGO_URI)

connectDB()