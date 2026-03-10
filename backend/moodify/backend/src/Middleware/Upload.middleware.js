const multer=require("multer")
const ImageKit=require("@imagekit/nodejs").default
const {toFile}=require("@imagekit/nodejs")

const upload=multer({storage:multer.memoryStorage()})


const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
})


const uploading=async({buffer,filename,folder})=>{

   const result= imagekit.files.upload({
         file:await toFile(Buffer.from(buffer),'file'),
        fileName:filename,
        folder:folder
    })
    return result

}

module.exports=uploading


