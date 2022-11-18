function unprocessableEntity(message?: string){
    throw {
        status: 422,
        message: message
    }
}

function notFound(message?: string){
    throw {
        status: 404,
        message
    }
}

function unauthorized(message?: string){
    throw {
        status: 401,
        message
    }   
}

export {
    unprocessableEntity,
    notFound,
    unauthorized
}