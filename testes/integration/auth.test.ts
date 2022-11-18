import supertest from "supertest"
import { prisma } from "../../src/config/database.js"
import app from "../../src/app.js"
import dotenv from "dotenv"
import * as factory from "../factory/factory.js"

dotenv.config()

console.log("tests running on base" + process.env.DATABASE_URL)

beforeEach(async ()=> {
    await prisma.users.deleteMany({where: {}})
})

describe("sign-up", ()=> {
    it("should create an new user from the correct data", async () => {
        const user = factory.createValidAuthData()
        const response = await supertest(app).post("/sign-up").send(user)
        expect(response.statusCode).toBe(201)
    })

    it("should fail create an new user from the correct data", async () => {
        const user = factory.createInValidAuthData()
        const response = await supertest(app).post("/sign-up").send(user)
        expect(response.statusCode).toBe(422)
    })

    it("should fail to duplicate userName on dataBase", async () => {
        const user = factory.createValidAuthData()
        await supertest(app).post("/sign-up").send(user)
        const response = await supertest(app).post("/sign-up").send(user)
        expect(response.statusCode).toBe(409)
    })
})

describe("sign-in", ()=> {
    it("should return an authentication token ", async () => {
        const user = factory.createValidAuthData()
        await supertest(app).post("/sign-up").send(user)
        const response = await supertest(app).post("/sign-in").send(user)
        expect(response.statusCode).toBe(200)
    })

    it("should fail for a non-existent user", async () => {
        const user = factory.createValidAuthData()
        const response = await supertest(app).post("/sign-in").send(user)
        expect(response.statusCode).toBe(404)
    })

    it("should return an authentication token ", async () => {
        const user = factory.createValidAuthData()
        await supertest(app).post("/sign-up").send(user)
        const {userName} = user
        const response = await supertest(app).post("/sign-in").send({userName, password: "4815162342B"})
        expect(response.statusCode).toBe(401)
    })
})