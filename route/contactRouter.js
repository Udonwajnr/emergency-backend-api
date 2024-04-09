const express = require("express")
const router = express.Router()
const {getContact,getAllContacts,createContact,updateContact,deleteContact} = require("../controller/contactController")
const {check} = require('express-validator')

router.route("/:id").get(getContact)
router.route("/").get(getAllContacts)
router.route("/").post(
    [
        check('fullName').notEmpty().withMessage("FullName cannot be empty"),
        check('phoneNumber').notEmpty().withMessage("phoneNumber cannot be empty"),
        check('email').notEmpty().withMessage("email cannot be empty").isEmail().withMessage("Must be an email"),
        check('relationship').notEmpty().withMessage("relationship cannot be empty"),
        check('user').notEmpty().withMessage("user cannot be empty"),
    ],
    createContact)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)

// when you comeback test post
module.exports = router