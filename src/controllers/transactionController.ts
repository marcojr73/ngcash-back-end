import { Request, Response } from "express"
import { InewTransaction } from "../models/models.js"
import { transaction } from "../services/transactionsServices.js"
import { isregisteredUserName, validateTokenAndGetAccount } from "../utils/utils.js"

async function newTransaction(req: Request, res: Response){
    const { userName, value }: InewTransaction = req.body
    const token: string = req.headers.authorization?.replace("Bearer", "").trim()
    const accountOut = await validateTokenAndGetAccount(token)
    const userIn = await isregisteredUserName(userName)
    await transaction(userIn.accountId, accountOut, value)
    res.status(200).send("transaction sucessfull")
}

export {
    newTransaction
}