import joi from "joi"

const schemaNewTransaction = joi.object({
    userName: joi.string().min(3).required(),
    value: joi.number().min(1).required(),
})

export {
    schemaNewTransaction,
} 
   