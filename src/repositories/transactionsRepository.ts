import { prisma } from "../config/database.js"
import { badRequest } from "../utils/errors.js"

async function transactionsDb(accountIn: number, accountOut: number, value: number) {
    try {
        return await prisma.$transaction(async (prisma) => {
            const sender = await prisma.accounts.update({
                where: {id: accountOut},
                data: { balance: {
                    decrement: value
                } }
            })
            if(sender.balance<0) throw Error
            await prisma.accounts.update({
                where: {id: accountIn},
                data: { balance: {
                    increment: value
                } }
            })
            await prisma.transactions.create({
                data: {
                    debitedAccountId: accountOut,
                    creditedAccountId: accountIn,
                    value
                }
            })
        })
    } catch (error) {
        badRequest("insuficiente balance")
    }
}

export {
    transactionsDb
}