import { Router } from "express";
import { ensureIsAdmin, ensureUserExist, ensureUserNotExist, verifyToken } from "../middlewares/auth/auth.middleware.js";
import { allUserController, loginController, registerController } from "../controllers/auth/auth.controller.js";


const authRouter = Router()

authRouter.post('/register', ensureUserNotExist, registerController)
authRouter.post('/login',ensureUserExist, loginController)
authRouter.get('/test', verifyToken, ensureIsAdmin, allUserController)

export default authRouter