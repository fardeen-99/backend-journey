const app=require("./src/app")

const Database=require("./src/config/database")

const model=require("./src/models/note.model")

Database()



app.post("/note",async(req,res)=>{

 const {title,description}=req.body
  
const note=await model.create({
    title,description
})    
res.status(201).json({
    message:"Note created successfully"
    ,note
})

})

app.get("/note",async(req,res)=>{

  const notes=await model.find()

res.status(200).json({
    message:"your data fetched succesfuly"
    ,notes
})

})



app.listen(3000,()=>{
    console.log(" server is running 0n 3000....");
    
})