import { findTransactionsByBetweenDates, findTransactionsByCredited, findTransactionsByDateAndCredited, findTransactionsByDateAndDebited, findTransactionsByDebited, findTransactionsNoFilters, transactionsDb } from "../repositories/transactionsRepository.js"
import { conflict } from "../utils/errors.js"

async function transaction(accountIn: number, accountOut: number, value: number){
    await transactionsDb(accountIn, accountOut, value)
}

async function isNotforMyself(accountIn: number, accountOut: number){
    if(accountIn === accountOut) conflict("this transaction is not allowed")
}

async function selectTransactions(accountId: number, initial?, final?, type?, ){
    const isBetweenDates = initial && final && !type
    const isByType = !initial && !final && type
    const isBetweenDatesAndByType = initial && final && type 

    if(isBetweenDates) {
        return await findTransactionsByBetweenDates(accountId, initial, final) 
    } 
    if(isByType) {
        if(type === "cashin") return await findTransactionsByCredited(accountId)
        if(type === "cashout") return await findTransactionsByDebited(accountId)
    }
    if(isBetweenDatesAndByType) {
        if(type === "cashin") return await findTransactionsByDateAndCredited(accountId, initial, final)
        if(type === "cashout") return await findTransactionsByDateAndDebited(accountId, initial, final)

    } 
    else return await findTransactionsNoFilters(accountId)
}

export {
    transaction,
    selectTransactions,
    isNotforMyself
}