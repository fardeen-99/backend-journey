const app=require("./src/app")
const database=require("./src/config/database")


database()



app.listen(3000,()=>{
    console.log("your server is running....");
})