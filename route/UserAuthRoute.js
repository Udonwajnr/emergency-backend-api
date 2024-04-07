const express = require("express")
const router = express.Router()
const {getAllUsers,getUser,register,verifyEmail,resendOpt} = require("../controller/userController") 

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser)
router.route("/").post(register)
router.route("/verify").post(verifyEmail)
router.route("/resendOtp").post(resendOpt)


module.exports=router