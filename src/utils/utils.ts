/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken"
import { findByUserName } from "../repositories/userRepository.js"
import { notFound, unauthorized } from "./errors.js"

async function validateTokenAndGetAccount(token: string){
    if (token === undefined) unauthorized("token not send")

    const {KEYJWT} = process.env
    const {accountId} = jwt.verify(token, KEYJWT, function(err, decoded){
        if(err) unauthorized("token expired or invalid")
        return decoded
    }) as any
    return accountId
}

async function isregisteredUserName(userName: string){
    const isRegistered = await findByUserName(userName)
    if(!isRegistered) notFound("not exist userName for this account")
    return isRegistered
}


export {
    validateTokenAndGetAccount,
    isregisteredUserName
}