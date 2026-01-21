let express=require("express")
let app=express()    //express initialization

app.get("/",(req,res)=>{
res.send("hello world")

})

app.get("/about",(req,res)=>{
    res.send("this is my about page")
})



app.listen(3000)