import {Router} from "express";
import {sendMessage,getChats,getMessages,deleteChat} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const chatrouter = Router();

chatrouter.post("/",authMiddleware,sendMessage);
chatrouter.get("/get-chats",authMiddleware,getChats);
chatrouter.get("/:id/messages",authMiddleware,getMessages);
chatrouter.delete("/:id/delete",authMiddleware,deleteChat);

export default chatrouter;