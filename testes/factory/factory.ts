import { faker } from "@faker-js/faker"

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

export {
    createValidAuthData,
    createInValidAuthData
}