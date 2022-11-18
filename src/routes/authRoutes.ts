import { Router } from "express"
import { SignIn, SignUp } from "../controllers/authController.js"
import { validateDataSignInUp } from "../middlewares/authMiddleware.js"

const authRoutes = Router()

authRoutes.post("/sign-up", validateDataSignInUp, SignUp)
authRoutes.post("/sign-in", validateDataSignInUp, SignIn)

export default authRoutes