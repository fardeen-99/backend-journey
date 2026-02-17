const express=require("express")
const multer=require("multer")
const IdentifyToken=require("../middlewares/auth.middleware")
const upload=multer({storage:multer.memoryStorage()})
const {PostRoute,GetPost,GetDetailPost}=require("../controllers/post.controller")

const postRouter=express.Router()

postRouter.post("/",upload.single("file"),IdentifyToken,PostRoute)
postRouter.get("/",IdentifyToken,GetPost)
postRouter.get("/detail/:id",IdentifyToken,GetDetailPost)

module.exports=postRouter



