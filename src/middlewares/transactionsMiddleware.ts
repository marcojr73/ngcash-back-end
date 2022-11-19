import { NextFunction, Request, Response } from "express"
import { InewTransaction } from "../models/models.js"
import { schemaGetTransactions, schemaNewTransaction } from "../schemas/transactionsSchemas.js"
import { unprocessableEntity } from "../utils/errors.js"

async function validateDataTransaction(req: Request, res: Response, next: NextFunction){
    const { userName, value }: InewTransaction = req.body
    const validation = await schemaNewTransaction.validateAsync({ userName, value })
    if(!validation) unprocessableEntity("you send incorrect data")
    next()
}

async function validateDataGetTransactions(req: Request, res: Response, next: NextFunction){
    const {initial, final, type} = req.query
    await schemaGetTransactions.validateAsync({initial, final, type})
    next()
}

export {
    validateDataTransaction,
    validateDataGetTransactions
}
