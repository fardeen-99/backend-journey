const express=require("express")

const app=express()

const notes=[]
app.use(express.json())  // post ka data red krne ke liye --- req.body

app.post("/user",(req,res)=>{

    
    res.send("post created")
    
    notes.push(req.body)
    
    console.log(notes);
    
    
    
})


app.get("/user",(req,res)=>{
    res.send(notes)
})

app.delete("/user")



app.listen(3000,()=>{
    console.log("server is started");
})