const express=require("express")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const {PostRoute,GetPost,GetDetailPost}=require("../controllers/post.controller")

const postRouter=express.Router()

postRouter.post("/",upload.single("file"),PostRoute)
postRouter.get("/",GetPost)
postRouter.get("/detail/:id",GetDetailPost)

module.exports=postRouter



