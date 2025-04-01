// Importamos la dependencia
const rateLimit = require('express-rate-limit');

// Esto va en el endpoint /register
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 3, // cantidad de intentos
    message: 'Muchos intentos de sesion. Intenta mas tarde.'
})

module.exports = { loginLimiter }