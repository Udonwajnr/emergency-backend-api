const asyncHandler = require("express-async-handler")
const User = require("../model/user")
const Token = require("../model/token")
const bcrypt = require("bcrypt")
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer")
const { sendingOtp } = require("../middleware/sendingOtpMail")
const JWT = require("jsonwebtoken")
const crypto = require("crypto")
const { sendingResetPasswordLink } = require("../middleware/sendingResetPasswordLink")

// 
const getAllUsers =asyncHandler(async(req,res)=>{
      const users = await User.find().exec()
      return res.status(200).json(users)
  })

const getUser=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(400).json({msg:"User does not exist"})
    }
    return res.status(200).json(user)
})

/**
 * @desc    Register a new user
 * @method  POST api/auth/register
 * @access  public 
 */

const register = asyncHandler(async(req,res)=>{
  const {fullName,email,phoneNumber,password,otp} = req.body  
  let user = await User.findOne({
    email:email
  })


  if(user){
    return res.status(422).json({msg:"Email is Already registered"})
    }

    const generatedUserOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  await sendingOtp({
    otp:generatedUserOtp
    })
    
    // const token = JWT.sign({id:user._id},process.env.JWT_SECRET)
    let data = {
      fullName,
      email,
      phoneNumber,
      password:await bcrypt.hash(password, 10),
      otp:generatedUserOtp,
  }

  // console.log("helo")

  const newUser = new User(data)
  
  await newUser.save();
  res.status(200).json({message:"Registration Successful"})    
})


/**
 * @desc    Register verify email
 * @method  POST api/user/verify
 * @access  public 
 */
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

// ======= resend otp =======
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
// ======= login =======
const login = asyncHandler(async(req,res)=>{
   const {email,password} = req.body

    const user = await User.findOne({
      email
    })

    if(!user){
      return res.status(400).json({msg:"User Not Found"})
    }
    const passwordMatch = await bcrypt.compare(password,user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = JWT.sign({id:user._id,email:user.email},
      process.env.JWT_SECRET || "1234!0@#%<{*&)",
    { expiresIn: "1h" })


    return res.status(200).json({ message: "Login Successful", data: user, token });
})



// ======= password reset request =======

const requestPasswordReset =asyncHandler(async(req,res)=>{
  const {email} = req.body
  if (!email){
    return res.status(422).json({ msg: "Email is required" })
  };
  
    const user = await User.findOne({email});
    
    // Check the user
    if (!user){
      return res.status(400).json("User not found");
    }

    let token = await Token.findOne({
      userId:user._id
    })

    if(!token){
      token = await new Token({
        userId:user._id,
        token:crypto.randomBytes(32).toString("hex"),
      }).save()
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`; 
    await sendingResetPasswordLink({link})

    return res.status(200).json({msg:"Email Sent",token:link})
})

// ======= password reset =======

const resetPassword =asyncHandler(async(req,res)=>{
  const {password} = req.body
  const user = await User.findById(req.params.userId);

  if (!user) return res.status(400).send("invalid link or expired");

  const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
  });
  if (!token) return res.status(400).send("Invalid link or expired");
  
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  await token.deleteOne();

  res.send("password reset successfully.");
})

module.exports = {getUser,getAllUsers,register,verifyEmail,resendOpt,login,requestPasswordReset,resetPassword}