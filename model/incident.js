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
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        }
},
{ timestamps: true }
)

module.exports = mongoose.model("Incident",incidentSchema)