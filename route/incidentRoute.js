const express = require("express")
const router = express.Router()
const {getAllIncident,getIncident,createIncident,updateIncident,deleteIncident} = require("../controller/incidentController")

router.route("/").get(getAllIncident)
router.route("/:id").get(getIncident)
router.route("/").post(createIncident)
router.route("/:id").put(updateIncident)
router.route("/:id").delete(deleteIncident)

module.exports = router