import joi from "joi"

const authRegex = /(?=.*?[A-Z])(?=.*?[0-9]){8}/

const schemaSignInUp = joi.object({
    userName: joi.string().min(3).required(),
    password: joi.string().min(8).pattern(authRegex).required(),
})

export {
    schemaSignInUp,
} 
   