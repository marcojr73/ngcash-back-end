import {prisma} from "../config/database.js"

async function getBallanceByaccountId(id: number) {
    return await prisma.accounts.findFirst({
        select: {balance: true},
        where: {id}
    })
}

export {
    getBallanceByaccountId
}