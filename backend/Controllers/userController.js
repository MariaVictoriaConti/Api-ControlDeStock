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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({'email': email})
        if (!user) {
            console.log('Usuario no encontrado.');
            return res.status(404).json({message: 'Usuario no registrado.'});
        }
        const userPassword = await bcrypt.compare(password, user.password)
        if (!userPassword) {
            console.log('Contraseña incorrecta');
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        res.status(200).json({ message: "Login exitoso" });
    } catch (error) {
        console.error('Ocurrio un error al iniciar sesion.', error)
    }
}

module.exports = { registerUser, loginUser }