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

describe("account", ()=> {
    it("should return details account", async () => {
        const user = await factory.createUser()
        const token = factory.generateTokenTest(user.accountId)
        const response = await supertest(app).get("/account").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(200)
    })

    it("should fail to send incorrect token", async () => {
        const token = factory.generateIncorrectTokenTest()
        const response = await supertest(app).get("/account").auth(token, {type: "bearer"})
        expect(response.statusCode).toBe(401)
    })
})