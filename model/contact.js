const contactSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        // unique:true,
        // required:false
    },
    relationship:{
        type:String,
        unique:true,
        required:false
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("Contact",contactSchema)