import { Router } from "express";
import { register, mailVerify, login, logout, Getme, resendMail } from "../controllers/auth.controller.js";
import { validate, validateLogin } from "../validation/auth.validation.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const authRouter = Router();

authRouter.post("/register", register)
authRouter.get("/mail-verify/:email", mailVerify)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/resend-mail", resendMail)
authRouter.get("/getme", authMiddleware, Getme)



export default authRouter;
