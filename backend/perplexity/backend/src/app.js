import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import path from "path"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"))
app.use(cors())

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter)


// app.get("/", async (req, res) => {
//   const data = await modelresponser("Hello bhai");
// //   res.send(data);
// console.log(data)
// });


app.get("*Name",(req,res)=>{
res.sendFile(path.join(__dirname,"..","/public/index.html"))
})



export default app;