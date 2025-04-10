// Importamos la dependencia
const rateLimit = require('express-rate-limit');

// Esta funcion va en el endpoint /register
const loginLimiter = rateLimit({
    windowMs:  1 * 60 * 1000, // 1 min
    max: 3, // cantidad de intentos
    message: 'Muchos intentos de sesion. Intenta mas tarde.'
})

module.exports = { loginLimiter }