import { Request, Response } from "express"
import { IauthData } from "../models/models"
import { encryptPassword, generateToken, isUserNameAlreadyInUse, registerNewUser, verifyPasswordIsCorrect } from "../services/authService.js"
import { isregisteredUserName } from "../utils/utils.js"

async function SignUp(req: Request, res: Response){
    let password: string = req.body.password
    const userName: string = req.body.userName
    await isUserNameAlreadyInUse(userName)
    password = encryptPassword(password)
    await registerNewUser({userName, password})
    res.status(201).send("created")
}

async function SignIn(req: Request, res: Response){
    const {userName, password}: IauthData = req.body
    const user = await isregisteredUserName(userName)
    await verifyPasswordIsCorrect(user.password, password)
    const token = generateToken(user.accountId)
    res.status(200).send(token)
}

export {
    SignIn,
    SignUp
}