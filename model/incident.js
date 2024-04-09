const mongoose = require("mongoose")

const incidentSchema = mongoose.Schema({
    incidentLocation:{
        type:String,
        required:true,
    },
    natureOfIncident:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        unique:false,
        required:false
    },
    fileUrl:{
        type:String,
        unique:false,
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