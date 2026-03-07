const app=require("./src/app")

let note=[]





app.post("/user",(req,res)=>{

note.push(req.body)

res.send("note is created")


})

app.get("/user",(req,res)=>{

res.send(note)

})


app.delete("/user/:index",(req,res)=>{

delete note[req.params.index]

res.send(`note ${req.params.index} is deleted`)

})

app.patch("/user/:index",(req,res)=>{

note[req.params.index].description=req.body.description

res.send("updated")
})

app.put("/user/:index",(req,res)=>{

note[req.params.index]=req.body


res.send("full updated note")

})

app.listen(3000,()=>{
    console.log("server is started");
})