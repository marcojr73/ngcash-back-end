import { Request, Response } from "express"
import { findUserName, getBalance } from "../services/accountsServices.js"
import { validateTokenAndGetAccount } from "../utils/utils.js"

async function account(req: Request, res: Response){
    const token: string = req.headers.authorization?.replace("Bearer", "").trim()
    const accountId = await validateTokenAndGetAccount(token)
    const userName = await findUserName(accountId)
    const balance = await getBalance(accountId)
    res.status(200).send({userName, balance})
}

export {
    account,
}