//Controller de usuarios

const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY || secretKey123

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            console.log('Campos incompletos.');
            return res.status(400).send('Campos incompletos.')
        }
        const userExist = await User.findOne({'email': email})
        if (!userExist) {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({'email': email, 'password': hashPassword})
            newUser.save()
            console.log('Usuario registrado con exito.');
            return res.status(201).send('Usuario registrado con exito.')
        } else {
            console.log('El usuario ya existe');
            return res.status(400).send('El usuario ya existe.')
        }
    } catch (error) {
        console.error('Ocurrio un error al registar usuario', error)
    }
}

module.exports = { registerUser }