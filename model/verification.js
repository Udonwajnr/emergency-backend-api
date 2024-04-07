const mongoose = require("mongoose")

const verificationSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    repeatPassword:{
        type:String,
        required:true
    },
    otp:{

    },
    verified:{
        type:Boolean,
        default:false
    },
    verifiedAt: {
        type: Date,
      },
},
{ timestamps: true }
)

module.exports = mongoose.model("verification",verificationSchema)