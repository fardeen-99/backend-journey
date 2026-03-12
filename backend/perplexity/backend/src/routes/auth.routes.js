import {Router} from "express";
import { register } from "../controllers/auth.controller.js";
import { validate } from "../validation/auth.validation.js";


const authRouter = Router();

authRouter.post("/register",validate,register)



export default authRouter;