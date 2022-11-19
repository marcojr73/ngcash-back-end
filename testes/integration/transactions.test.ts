import supertest from "supertest"
import { prisma } from "../../src/config/database.js"
import app from "../../src/app.js"
import dotenv from "dotenv"
import * as factory from "../factory/factory.js"

dotenv.config()

console.log("tests running on base" + process.env.DATABASE_URL)

beforeEach(async ()=> {
    await prisma.transactions.deleteMany({where: {}})
    await prisma.users.deleteMany({where: {}})
    await prisma.accounts.deleteMany({where: {}})
})

describe("new transaction", ()=> {
    it("should sucess to send transaction", async () => {
        const cashinUser = await factory.createUser()
        const cashoutUser = await factory.createUser()
        const token = factory.generateTokenTest(cashoutUser.accountId)
        const data = factory.createDataNewTransaction(cashinUser.userName)
        const response = await supertest(app).post("/transaction").auth(token, {type: "bearer"}).send(data)
        expect(response.statusCode).toBe(200)
    })
    it("should fail when sending a transaction to an unregistered user", async () => {
        const cashinUser = factory.createFakeUser()
        const cashoutUser = await factory.createUser()
        const token = factory.generateTokenTest(cashoutUser.accountId)
        const data = factory.createDataNewTransaction(cashinUser)
        const response = await supertest(app).post("/transaction").auth(token, {type: "bearer"}).send(data)
        expect(response.statusCode).toBe(404)
    })
    it("should fail to send transaction myself", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const data = factory.createDataNewTransaction(user.userName)
        const response = await supertest(app).post("/transaction").auth(token, {type: "bearer"}).send(data)
        expect(response.statusCode).toBe(409)
    })
    it("should fail to send incorrect token", async () => {
        const user = await factory.createUser()
        const token = factory.generateIncorrectTokenTest()
        const data = factory.createDataNewTransaction(user.userName)
        const response = await supertest(app).post("/transaction").auth(token, {type: "bearer"}).send(data)
        expect(response.statusCode).toBe(401)
    })
})

describe("list transactions of user", ()=> {
    it("should sucess when not send filter", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const response = await supertest(app).get("/transactions").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })
    it("should sucess when send filter dates", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const response = await supertest(app).get("/transactions?initial=2015-10-21T16:30:00.202Z&final=2015-10-21T16:30:01.202Z").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })
    it("should sucess when send filter dates and type", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const response = await supertest(app).get("/transactions?initial=2015-10-21T16:30:00.202Z&final=2015-10-21T16:30:01.202Z&type=cashin").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })
    it("should sucess when send filter type", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const response = await supertest(app).get("/transactions?type=cashin").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })
    it("should fail when not send incorrect date", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const response = await supertest(app).get("/transactions?initial=devoltaparaofuturo&final=devoltaparaofuturo").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(422)
    })
    it("should fail when not send incorrect type", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const response = await supertest(app).get("/transactions?type=devoltaparaofuturo").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(422)
    })
})