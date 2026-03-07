const app=require("./src/app")
const databse=require("./src/config/database")

databse()



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})