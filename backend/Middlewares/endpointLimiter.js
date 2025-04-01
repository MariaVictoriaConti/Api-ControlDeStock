// Es basicamente lo mismo que loginLimiter, pero acá es para que no se hagan muchas solicitudes al mismo tiempo a un mismo endpoint
// Por lo que entendí es para los ataques que buscan saturar el servidor con muchas solicitudes
// No sé quien va a querer saturar nuestro servidor pero bueh, lo agregamos para que quede mas lindo (?)
// Se usa en app.js segun tengo entendido

const rateLimit = require('express-rate-limit');

const endpointLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100, // Este es máximo de solicitudes que se pueden hacer por IP, en el tiempo establecido arriba
    message: 'Demasiadas solicitudes. Intente más tarde.',
})

module.exports = { endpointLimiter }