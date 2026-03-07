const ImageKit=require("@imagekit/nodejs")
const {toFile} =require("@imagekit/nodejs")
const image=new ImageKit({
   privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})


const PostRoute=async(req,res)=>{

console.log(req.body,req.file)

const photo=await image.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName:"fardeen khan"
})

res.send(photo)
}


module.exports={PostRoute}