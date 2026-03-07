const express=require("express")

const PostRouter=express.Router()
const {PostRoute}=require("../controllers/post.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})

//multer------> use for file read in express jo ki req.body/req.file mein aayi hai 

// memorystorage ---> save in memory for temporary time save in ram taaki cloud pr upload hoajye bss utne time ke liye

//diskStorage ----> save in internal storage hardisk ssd m save hogyi permanently 


// agar server pr store krenge tou bandwidth bdhegi server heavy load m aajayega isliye cloud pr save
// save in ------> cloud imagekit/s3/cloudinary 


// jo naam upload m dalo yw wo naam h jis naam se upload kroge mtlb kis naam se frontend ya post man se upload kroge file

PostRouter.post("/",upload.single("file"),PostRoute)



module.exports=PostRouter