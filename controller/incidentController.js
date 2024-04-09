const asyncHandler = require("express-async-handler")
const Incident = require("../model/incident")

const getAllIncident = asyncHandler(async(req,res)=>{
    const incident = await Incident.find()
    return res.status(200).json(incident)
})

const getIncident = asyncHandler(async(req,res)=>{
    const incident = await Incident.findById(req.params.id).populate("user")
    if(!incident){
      return res.status(400).json({msg:"Incident does not exist"})
    }
    return res.status(200).json(incident)
})


const createIncident=asyncHandler(async(req,res)=>{
    const incident = new Incident({
        incidentLocation:req.body.incidentLocation,
        natureOfIncident:req.body.natureOfIncident,
        comment:req.body.comment,
        fileUrl:req.body.fileUrl,
        user:req.body.user
    })
    await incident.save()
    res.status(200).json({message:"Incident Created Successfully"})    
})


const updateIncident = asyncHandler(async(req,res)=>{
    const incident = await Incident.findById(req.params.id)
    if(!incident){
        throw new Error("Incident Not found")
    }

    const updateIncident = await Incident.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updateIncident)
})

const deleteIncident=asyncHandler(async(req,res)=>{
    const incident = await Incident.findById(req.params.id)
    if(!incident){
        throw new Error("Incident Not found")
    }
    await Incident.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:`${req.params.id} has been deleted`})
})

module.exports = {getAllIncident,getIncident,createIncident,updateIncident,deleteIncident}