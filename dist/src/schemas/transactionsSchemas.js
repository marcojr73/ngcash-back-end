import joi from "joi";
var schemaNewTransaction = joi.object({
    userName: joi.string().min(3).required(),
    value: joi.number().min(1).required()
});
var schemaGetTransactions = joi.object({
    initial: joi.date(),
    final: joi.date(),
    type: joi.string().equal("cashin").equal("cashout")
});
export { schemaNewTransaction, schemaGetTransactions };
