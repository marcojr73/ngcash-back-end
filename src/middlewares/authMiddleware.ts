import { NextFunction, Request, Response } from "express";
import { IauthData } from "../models/models";
import { schemaSignInUp } from "../schemas/authSchemas.js";
import { unprocessableEntity } from "../utils/errors.js";

async function validateDataSignInUp(req: Request, res: Response, next: NextFunction){
    const authData: IauthData = req.body
    const validation = await schemaSignInUp.validateAsync(authData)
    if(!validation) unprocessableEntity()
    next()
}

export {
    validateDataSignInUp
}