import cors from "cors"
import express from "express"
import "express-async-errors"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"
import accountRoutes from "./routes/accountRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use(authRoutes)
app.use(accountRoutes)

app.use(errorHandler)



export default app