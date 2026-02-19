const app=require("./src/app")
const database=require("./src/config/database")

database()



app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");
})