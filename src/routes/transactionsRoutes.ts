import { Router } from "express"
import { newTransaction } from "../controllers/transactionController.js"
import { validateDataTransaction } from "../middlewares/transactionsMiddleware.js"

const transactionsRoutes = Router()

transactionsRoutes.post("/transaction", validateDataTransaction, newTransaction)

export default transactionsRoutes