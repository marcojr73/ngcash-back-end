import { Router } from "express"
import { account } from "../controllers/accountController.js"

const accountRoutes = Router()

accountRoutes.get("/account", account)

export default accountRoutes