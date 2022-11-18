import { Request, Response } from "express"
import { IauthData } from "../models/models"
import { encryptPassword, generateToken, isregisteredUserName, isUserNameAlreadyInUse, registerNewUser, verifyPasswordIsCorrect } from "../services/authService.js"

async function SignUp(req: Request, res: Response){
    let password: string = req.body
    const userName: string = req.body
    await isUserNameAlreadyInUse(userName)
    password = encryptPassword(password)
    await registerNewUser({userName, password})
    res.status(200).send("created")
}

async function SignIn(req: Request, res: Response){
    const {userName, password}: IauthData = req.body
    const user = await isregisteredUserName(userName)
    await verifyPasswordIsCorrect(user.password, password)
    const token = generateToken(user.id)
    res.status(200).send(token)
}

export {
    SignIn,
    SignUp
}