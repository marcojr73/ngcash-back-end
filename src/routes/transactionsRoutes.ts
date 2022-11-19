import { Router } from "express"
import { listTransactions, newTransaction } from "../controllers/transactionController.js"
import { validateDataGetTransactions, validateDataTransaction } from "../middlewares/transactionsMiddleware.js"

const transactionsRoutes = Router()

transactionsRoutes.post("/transaction", validateDataTransaction, newTransaction)
transactionsRoutes.get("/transactions", validateDataGetTransactions, listTransactions)

export default transactionsRoutes