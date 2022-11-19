import { faker } from "@faker-js/faker"
import jwt from "jsonwebtoken"
import {prisma} from "../../src/config/database.js"

function createValidAuthData(){
    return {
        userName: faker.name.firstName("male"),
        password: "4811342A"
    }
}

function createInValidAuthData(){
    return {
        userName: faker.name.firstName("male"),
        password: faker.animal.cat()
    }
}

function generateTokenTest(accountId: number){
    const {KEYJWT} = process.env
    return jwt.sign({ accountId }, KEYJWT, { expiresIn: "1d"})
}

function generateIncorrectTokenTest(){
    return faker.finance.bitcoinAddress.toString()
}

async function createUser(){
    const account = await prisma.accounts.create({
        data: {}
    })
    const user = await prisma.users.create({
        data: {
            userName: faker.name.firstName("male"),
            password: "4815162342",
            accountId: account.id
        }
    })
    return user
}

function createFakeUser(){
    return faker.name.firstName("male")
}

function createDataNewTransaction(userName: string){
    return {
        userName,
        value: 100
    }
}

export {
    createValidAuthData,
    createInValidAuthData,
    generateTokenTest,
    createUser,
    generateIncorrectTokenTest,
    createDataNewTransaction,
    createFakeUser
}