const express = require("express")
const router = express.Router()
const {getAllPosts,createPost,deletePost,updatePost,getPost} = require("../controller/postController")
const {check} = require('express-validator')

router.route("/").get(getAllPosts)
router.route("/:id").get(getPost)
router.route("/").post(createPost)
router.route("/:id").put(updatePost)
router.route("/:id").delete(deletePost)

module.exports =router