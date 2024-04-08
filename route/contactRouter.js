const express = require("express")
const router = express.Router()
const {getContact,getAllContacts,createContact,updateContact,deleteContact} = require("../controller/contactController")

router.route("/:id").get(getContact)
router.route("/").get(getAllContacts)
router.route("/").post(createContact)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)

// when you comeback test post
module.exports = router