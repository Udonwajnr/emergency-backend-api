const asyncHandler = require("express-async-handler")
const incident = require("../model/incident")

const getAllIncident = asyncHandler(async(req,res)=>{
    console.log("helllo")
})


module.exports = {getAllIncident}