const asyncHandler = require("express-async-handler")
const Post = require("../model/post")
const {validationResult} =require('express-validator')

const getAllPosts = asyncHandler(async(req,res)=>{
    const posts = await Post.find()
    return res.status(200).json(posts)
})

const createPost = asyncHandler(async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    
    const posts = new Post({
        title:req.body.title,
        article:req.body.article,
    })
    await posts.save()
    res.status(200).json({message:"Post Created Successfully"})    
})

const updatePost = asyncHandler(async(req,res)=>{
    const posts = await Post.findById(req.params.id)
    if(!posts){
        throw new Error("Post Not found")
    }

    const updatePost = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json(updatePost)
})

const deletePost=asyncHandler(async(req,res)=>{
    const posts = await Post.findById(req.params.id)
    if(!posts){
        throw new Error("Post Not found")
    }
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:`${req.params.id} has been deleted`})
})


module.exports={getAllPosts,createPost,updatePost,deletePost}