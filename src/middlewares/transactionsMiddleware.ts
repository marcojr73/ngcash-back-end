import { NextFunction, Request, Response } from "express"
import { InewTransaction } from "../models/models.js"
import { schemaNewTransaction } from "../schemas/transactionsSchemas.js"
import { unprocessableEntity } from "../utils/errors.js"

async function validateDataTransaction(req: Request, res: Response, next: NextFunction){
    const { userName, value }: InewTransaction = req.body
    const validation = await schemaNewTransaction.validateAsync({ userName, value })
    if(!validation) unprocessableEntity("you send incorrect data")
    next()
}

export {
    validateDataTransaction
}
