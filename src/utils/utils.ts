/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken"
import { unauthorized } from "./errors.js"

async function validateTokenAndGetAccount(token: string){
    if (token === undefined) unauthorized("token not send")

    const {KEYJWT} = process.env
    const {accountId} = jwt.verify(token, KEYJWT, function(err, decoded){
        if(err) unauthorized("token expired or invalid")
        return decoded
    }) as any
    return accountId
}


export {
    validateTokenAndGetAccount
}