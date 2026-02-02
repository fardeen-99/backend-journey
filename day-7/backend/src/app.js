const express=require("express")

const app=express()

const cors=require("cors")

app.use(cors())

app.use(express.json())
require("dotenv").config()

const notemodel=require("./models/note.model")

app.post("/api/notes",async(req,res)=>{

const {title,description}=req.body

const note= await notemodel.create({
    title,description
})

res.status(201).json({
    message:"your note created succesfully"
 ,   note
})
})

app.get("/api/notes",async(req,res)=>{
  const note = await notemodel.find()
  res.status(200).json({
    message:"your notes fetched succesfully",
    note
  })
})

app.delete("/api/notes/:id",async(req,res)=>{

const id=req.params.id

await notemodel.findByIdAndDelete(id)

res.status(200).json({
    message:"your note deleted succesfully"
    
})

})

app.patch("/api/notes/:id",async(req,res)=>{
    
    const id=req.params.id
    const {description}=req.body
    await notemodel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"your note updated succesfully"
        
    })

})
app.put("/api/notes/:id",async(req,res)=>{
    
    const id=req.params.id
        const {title,description}=req.body

    await notemodel.findByIdAndUpdate(id,{title,description})
    res.status(200).json({
        message:"your fully note updated succesfully"
        
    })

})

module.exports=app