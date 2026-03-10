const ImageKit=require("@imagekit/nodejs").default
const {toFile}=require("@imagekit/nodejs")
const express=require("express")
const songmodel=require("../models/song.model")
const id3=require("node-id3")
const songRoute=express.Router()
const Identifier=require("../Middleware/aurh.middleware")
const uploading=require("../Middleware/Upload.middleware")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()
    ,
        limits:{
            fileSize:1024*1024*10
        }
    
})



const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
})




songRoute.post("/",Identifier,upload.single("file"),async(req,res)=>{
 const tags=id3.read(req.file.buffer)
//     console.log(tags)
// console.log(req.query.mood)
// console.log(req.user.id)

    // const result=await imagekit.files.upload({
    //     file:await toFile(Buffer.from(req.file.buffer),'file'),
    //     fileName:'song',
    //     folder:"songs"
    // })




    // console.log(result)


    // const image=await imagekit.files.upload({
    //     file:await toFile(Buffer.from(tags.image.imageBuffer),'file'),
    //     fileName:'song',
    //     folder:"songs"
    // })

    let arr=[
   uploading({buffer:req.file.buffer,filename:tags.title+".mp3",folder:"moodify/songs"}),

]
    if(tags.image){
     const image=uploading({buffer:tags.image.imageBuffer,filename:tags.title+".jpg",folder:"moodify/images"})
    arr.push(image)
    }
const [result,imageurl]=await Promise.all(arr)
    // let imageurl=""

// console.log(tags)
// let result=all[0]
// let imageurl=all[1]




   const song=await songmodel.create({
    title:tags.title,
    artist:tags.artist,
    album:tags.album || "unknown",
    mood:req.query.mood,
    image_url:imageurl?imageurl.url:"",
    song_url:result.url,
    uploadedBy:req.user.id
   })
    
    res.status(200).json({
        message:"song uploaded successfully",
        song
    })
})


songRoute.get("/",Identifier,async(req,res)=>{
    const song=await songmodel.find({
        mood:req.query.mood,
        uploadedBy:null
    })
    res.status(200).json({
        message:"song fetched successfully",
        song
    })
})

songRoute.get("/user",Identifier,async(req,res)=>{
    const song=await songmodel.find({
        mood:req.query.mood,
        uploadedBy:req.user.id
    })
    res.status(200).json({
        message:"song fetched successfully",
        song
    })
})




module.exports=songRoute