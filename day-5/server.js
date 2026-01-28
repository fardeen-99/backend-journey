const app=require("./src/app")

let notes=[]
app.get("/notes",(req,res)=>{

res.status(200).json({
    message:notes
})

})
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message:"note created"
    })
})
app.delete("/notes/:index",(req,res)=>{

    delete notes[req.params.index]

    res.send(205).json({
        message:"note deleted"
    })

})

app.patch("/notes/:index",(req,res)=>{

        notes[req.params.index].discription=req.body.discription

res.send(200).json({

    message:"your note is updated"
})





})


const mongoose=require("mongoose")

function connectTodb(){
    mongoose.connect("mongodb+srv://fardeenkhan63574_db_user:6i3DYBAqlokI3mz7@cluster0.mub8ena.mongodb.net/day-5").then(()=>console.log("your database is connencted"))

}
connectTodb()

app.listen(3000,()=>{
    console.log("Server is Started..");
    
})