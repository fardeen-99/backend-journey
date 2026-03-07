const app=require("./src/app")

const database=require("./src/config/database")

database()


app.listen(3000,()=>{
    console.log("server is runnng on port 3000");
})