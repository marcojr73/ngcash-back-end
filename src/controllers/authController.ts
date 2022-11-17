import { Request, Response } from "express";

async function SignIn(req: Request, res: Response){
    res.send(200)
}

async function SignUp(req: Request, res: Response){
    
}


export {
    SignIn,
    SignUp
}