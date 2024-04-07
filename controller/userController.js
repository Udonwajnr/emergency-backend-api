const asyncHandler = require("express-async-handler")
const User = require("../model/user")
const bcrypt = require("bcrypt")
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer")
const { sendingOtp } = require("../middleware/sendingOtpMail")


  const getAllUsers =asyncHandler(async(req,res)=>{
      const users = await User.find()
      return res.status(200).json(users)
  })

    const getUser=asyncHandler(async(req,res)=>{
        const user = await User.findById(req.params.id)
        if(!user){
          return res.status(400).json({msg:"User does not exist"})
        }
        return res.status(200).json(user)
  })

const register = asyncHandler(async(req,res)=>{
  const {fullName,email,phoneNumber,password,otp} = req.body  
  const user = await User.findOne({
    email:email
  })

  if(user){
    return res.status(422).json({msg:"Email is Already registered"})
    }
  

    const generatedUserOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
     sendingOtp({
    otp:generatedUserOtp
    })

    let data = {
      fullName,
      email,
      phoneNumber,
      password:await bcrypt.hash(password, 10),
      otp:generatedUserOtp
  }

  const newUser = new User(data)
  await  newUser.save();
  res.status(200).json({message:"Registration Successful"})    
})

// verify email
const verifyEmail =asyncHandler(async(req,res)=>{
  const {email,otp} = req.body
  const user = await User.findOne({email})

  if(!user){
    return res.status(400).json({msg:'user not found'})
  }
  if(user && user.otp !==otp){
    return res.status(500).json({msg:"Invalid Opt"})
  }
  res.send(user)
})

// resend otp
const resendOpt =asyncHandler(async(req,res)=>{
  const {email} = req.body
  const user = await User.findOne({
    email
  })
  if(!user){
    return res.status("400").json("User Does not exist")
  }
  
  const generatedUserOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });  
  const updatedUserOtp = await User.findOneAndUpdate({email:email},{otp:generatedUserOtp},{new:true})  
  sendingOtp({otp:generatedUserOtp})


  res.status(200).json(updatedUserOtp)
})



module.exports = {getUser,getAllUsers,register,verifyEmail,resendOpt}