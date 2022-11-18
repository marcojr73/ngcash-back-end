import { transactionsDb } from "../repositories/transactionsRepository.js"

async function transaction(accountIn: number, accountOut: number, value: number){
    await transactionsDb(accountIn, accountOut, value)
}

export {
    transaction
}