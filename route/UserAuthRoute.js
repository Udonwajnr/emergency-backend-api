const express = require("express")
const router = express.Router()
const {getAllUsers,getUser,register,verifyEmail,resendOpt,login,requestPasswordReset,resetPassword} = require("../controller/userController") 
const isAuth = require("../middleware/isAuth")

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser)
router.route("/").post(register)
router.route("/verify").post(verifyEmail)
router.route("/resendOtp").post(resendOpt)
router.route("/login").post(login)
router.route("/requestPasswordReset").post(requestPasswordReset)
router.route("/:userId/:token").post(resetPassword)

module.exports=router

// 6613d7c2e12599474b2e2408