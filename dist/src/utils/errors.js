function unprocessableEntity(message) {
    throw {
        status: 422,
        message: message
    };
}
function notFound(message) {
    throw {
        status: 404,
        message: message
    };
}
function unauthorized(message) {
    throw {
        status: 401,
        message: message
    };
}
function conflict(message) {
    throw {
        status: 409,
        message: message
    };
}
function badRequest(message) {
    throw {
        status: 400,
        message: message
    };
}
export { unprocessableEntity, notFound, unauthorized, conflict, badRequest };
