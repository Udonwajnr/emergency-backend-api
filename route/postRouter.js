const express = require("express")
const router = express.Router()
const {getAllPosts,createPost,deletePost,updatePost} = require("../controller/postController")
const {check} = require('express-validator')

router.route("/").get(getAllPosts)
router.route("/").post(createPost)
router.route("/:id").put(updatePost)
router.route("/:id").delete(deletePost)

module.exports =router