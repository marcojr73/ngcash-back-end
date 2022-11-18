import {prisma} from "../config/database.js"
import { IauthData } from "../models/models.js"

async function findByUserName(userName: string){
    return await prisma.users.findFirst({
        where: {userName: userName}
    })
}

async function insertDbUserAndCreateAccount(data: IauthData){
    const account = await prisma.accounts.create({
        data: {}
    })
    return await prisma.users.create({
        data: {
            userName: data.userName,
            password: data.password,
            accountId: account.id
        }
    })
}

async function findUserNameByAccountId(accountId: number){
    return await prisma.users.findFirst({
        select: {userName: true},
        where: {accountId}
    })
}

export {
    findByUserName,
    insertDbUserAndCreateAccount,
    findUserNameByAccountId
}