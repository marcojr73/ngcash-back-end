import { findByUserName, insertDbUserAndCreateAccount } from "../repositories/userRepository.js"
import { conflict, notFound, unauthorized } from "../utils/errors.js"
import bcrypt from "bcrypt"
import { IauthData } from "../models/models.js"
import jwt from "jsonwebtoken"

async function isUserNameAlreadyInUse(userName: string){
    const isAvailable = await findByUserName(userName)
    if(isAvailable) conflict("this userName already in use")
}

function encryptPassword(password: string){
    return bcrypt.hashSync(password, 10)
}

async function registerNewUser(data: IauthData){
    await insertDbUserAndCreateAccount(data) 
}

async function isregisteredUserName(userName: string){
    const isRegistered = await findByUserName(userName)
    if(!isRegistered) notFound("not exist userName for this account")
    return isRegistered
}

async function verifyPasswordIsCorrect(passCrypt: string, password: string){
    const ans = bcrypt.compareSync(password, passCrypt)
    if(!ans) unauthorized("password is incorrect")
}

function generateToken(userId: number){
    const {KEYJWT} = process.env
    return jwt.sign({ userId }, KEYJWT, { expiresIn: "1d"})
}

export {
    isUserNameAlreadyInUse,
    encryptPassword,
    registerNewUser,
    isregisteredUserName,
    verifyPasswordIsCorrect,
    generateToken
}