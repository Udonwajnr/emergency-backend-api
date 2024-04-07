const mongoose = require("mongoose")

const incidentSchema = mongoose.Schema({
    incidentLocation:{
        type:String,
        required:true,
        unique:true
    },
    natureOfIncident:{
        type:String,
        required:true,
        unique:true
    },
    comment:{
        type:String,
        unique:true,
        required:false
    },
    fileUrl:{
        type:String,
        unique:true,
        required:false
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("Incident",incidentSchema)