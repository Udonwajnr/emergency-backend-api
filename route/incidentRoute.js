const express = require("express")
const router = express.Router()
const {getAllIncident,getIncident,createIncident,updateIncident,deleteIncident} = require("../controller/incidentController")
const {check} = require('express-validator')

router.route("/").get(getAllIncident)
router.route("/:id").get(getIncident)
router.route("/").post(
    [
        check('incidentLocation').notEmpty().withMessage("Incident Location cannot be empty"),
        check('natureOfIncident').notEmpty().withMessage("Nature Of Incident cannot be empty"),
        check('user').notEmpty().withMessage("user cannot be empty"),
    ]
    ,createIncident)
router.route("/:id").put(updateIncident)
router.route("/:id").delete(deleteIncident)

module.exports = router