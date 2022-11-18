import { getBallanceByaccountId } from "../repositories/accountsRepository.js"
import { findUserNameByAccountId } from "../repositories/userRepository.js"

async function findUserName(accountId: number){
    const ans = await findUserNameByAccountId(accountId)
    return ans.userName
}

async function getBalance(accountId: number){
    const ans = await getBallanceByaccountId(accountId)
    return ans.balance
}

export {
    findUserName,
    getBalance
}