const express = require("express")
const app=express()
const cors=require("cors")
const model=require("./model/node.model")

app.use(express.json())
app.use(cors())

require("dotenv").config()

app.post("/api/node",async(req,res)=>{

    const{title,description,photo}=req.body

const note=await model.create({
    title,description,photo
})
res.status(201).json({
    message:"your notes created succesfully",
    note
})

})
app.get("/api/node",async(req,res)=>{


const note=await model.find()
res.status(200).json({
    message:"your notes Fetched succesfully",
    note
})

})
app.delete("/api/node/:id",async(req,res)=>{
const{id}=req.params.id

const note=await model.findByIdAndDelete(id)
res.status(200).json({
    message:"your note deleted succesfully"
})

})
app.patch("/api/node/:id",async(req,res)=>{
const{id}=req.params.id
const {description}=req.body
await model.findByIdAndUpdate(id,{description})
res.status(200).json({
    message:"your note updated succesfully"
})

})





module.exports=app