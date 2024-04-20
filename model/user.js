const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
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
    otp:{
    type: String,
    required: true,
    },
    contact:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Contact',
            required:false
        }
    ]
},
{ timestamps: true }
)

module.exports = mongoose.model("User",userSchema)