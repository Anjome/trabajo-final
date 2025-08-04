
import { Router } from "express";
import { register, login } from "../controller/authController";


const authRouter = Router()

//register
authRouter.post("/register", register)
//login
authRouter.post("/login", login)


export { authRouter }