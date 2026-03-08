const ImageKit=require("@imagekit/nodejs").default
const {toFile}=require("@imagekit/nodejs")
const express=require("express")
const id3=require("node-id3")
const songRoute=express.Router()
const Identifier=require("../Middleware/aurh.middleware")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})


const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
})




songRoute.post("/",upload.single("file"),async(req,res)=>{
 const tags=id3.read(req.file.buffer)
    console.log(tags)



    const result=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:'song',
        folder:"songs"
    })


    const image=await imagekit.files.upload({
        file:await toFile(Buffer.from(tags.image.imageBuffer),'file'),
        fileName:'song',
        folder:"songs"
    })

    res.send({
        result,image
    })
console.log(tags)
})


module.exports=songRoute