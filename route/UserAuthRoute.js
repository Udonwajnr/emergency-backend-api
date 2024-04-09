const express = require("express")
const router = express.Router()
const {getAllUsers,getUser,register,verifyEmail,resendOpt,login,requestPasswordReset,resetPassword} = require("../controller/userController") 
const isAuth = require("../middleware/isAuth")
const {check} = require('express-validator')

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser)
router.route("/").post(
    [
        check('fullName').notEmpty().withMessage("FullName cannot be empty"),
        check('phoneNumber').notEmpty().withMessage("phoneNumber cannot be empty"),
        check('email').notEmpty().withMessage("email cannot be empty").isEmail().withMessage("Must be an email"),
        check("password").notEmpty()
        .withMessage("Password cannot be empty")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage("Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ")
    ]
    ,register)
router.route("/verify").post(verifyEmail)
router.route("/resendOtp").post(resendOpt)
router.route("/login").post(login)
router.route("/requestPasswordReset").post(requestPasswordReset)
router.route("/:userId/:token").post(resetPassword)

module.exports=router

// 6613d7c2e12599474b2e2408