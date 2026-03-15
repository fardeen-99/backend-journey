import {Router} from "express";
import { register,mailVerify,login ,Getme,resendMail} from "../controllers/auth.controller.js";
import { validate,validateLogin } from "../validation/auth.validation.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const authRouter = Router();

authRouter.post("/register",validate,register)
authRouter.get("/mail-verify/:email",mailVerify)
authRouter.post("/login",validateLogin,authMiddleware,login)
authRouter.post("/resend-mail",resendMail)
authRouter.get("getme",authMiddleware,Getme)



export default authRouter;