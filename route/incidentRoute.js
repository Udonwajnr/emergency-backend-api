const express = require("express")
const router = express.Router()
const {getAllIncident} = require("../controller/incidentController")

router.route("/").get(getAllIncident)
module.exports = router