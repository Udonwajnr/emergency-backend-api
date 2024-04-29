const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    article:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model("Post",postSchema)