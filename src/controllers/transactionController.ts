import { Request, Response } from "express"
import { InewTransaction } from "../models/models.js"
import { isNotforMyself, selectTransactions, transaction } from "../services/transactionsServices.js"
import { isregisteredUserName, validateTokenAndGetAccount } from "../utils/utils.js"

async function newTransaction(req: Request, res: Response){
    const { userName, value }: InewTransaction = req.body
    const token: string = req.headers.authorization?.replace("Bearer", "").trim()
    const accountOut = await validateTokenAndGetAccount(token)
    const userIn = await isregisteredUserName(userName)
    await isNotforMyself(userIn.accountId, accountOut)
    await transaction(userIn.accountId, accountOut, value)
    res.status(200).send("transaction sucessfull")
}

async function listTransactions(req: Request, res: Response){
    const {initial, final, type} = req.query
    const token: string = req.headers.authorization?.replace("Bearer", "").trim()
    const accountId = await validateTokenAndGetAccount(token)
    const transactions = await selectTransactions(accountId, initial, final, type, )
    res.status(200).send(transactions)
}

export {
    newTransaction,
    listTransactions
}