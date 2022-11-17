function unprocessableEntity(message?: string){
    throw {
        status: 422,
        message: message
    }
}

export {
    unprocessableEntity
}