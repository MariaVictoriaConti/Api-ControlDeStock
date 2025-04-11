//Controller de usuarios

const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY || "secretKey123"

// Funcion para registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            console.log('Campos incompletos.');
            return res.status(400).json({message: 'Campos incompletos.'})
        }
        const userExist = await User.findOne({'email': email})
        if (!userExist) {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({'email': email, 'password': hashPassword})
            newUser.save()
            console.log('Usuario registrado con exito.');
            return res.status(201).json({message: 'Usuario registrado con exito.'})
        } else {
            console.log('El usuario ya existe');
            return res.status(400).json({message: 'El usuario ya existe.'})
        }
    } catch (error) {
        console.error('Ocurrio un error al registar usuario', error)
    }
}

// Funcion para logeo de un usuario ya registrado
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({'email': email})
        if (!user) {
            console.log('Usuario no encontrado.');
            return res.status(404).json({message: 'Usuario no registrado.'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            console.log('Contraseña incorrecta');
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        //Generar token
        const token = jwt.sign({ email: email }, secretKey, {expiresIn: '1h'})
        //console.log(token);
        
        if(!token){
            console.log('Error al generar el token')
            return res.status(500).json({message: 'Error al generar el token'})
        }
        return res.status(200).json({ message: "Login exitoso", token: token });
    } catch (error) {
        console.error('Ocurrio un error al iniciar sesion.', error)
    }
}

// Funcion para obtener todos los usuarios 
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.error('No se pudo obtener la lista de usuarios.', error)
    }
}

// Funcion para obtener un usuario por su id - FUNCIONA
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        res.json(user)
    } catch (error) {
        res.status(404).json({message: 'No se pudo encontrar al usuario.'})
        console.error('No se pudo encontrar al usuario.')
    }
}

//Funcion para eliminar un usuario por ID - 
const deleteUserById  = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado.'})
        }
        res.json({message: 'Usuario eliminado'})
    } catch (error) {
        console.error('Error al eliminar el Usuario.')
    }
}


// Funcion para editar info de un usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        let {email, password} = req.body
        const newData = {email, password}
        if (password) {
            const newPassword = await bcrypt.hash(newData.password, 10)
            newData.password = newPassword
        }
        if (!id || !newData) {
            return res.status(400).json({message: 'Error en la información enviada.'})
        }
        const update = await User.findByIdAndUpdate(id, newData)
        res.status(200).json({message: 'Usuario actualizado con éxito.'})
    } catch (error) {
        console.error('Ocurrio un error al guardar los cambios. Intente nuevamente.', error)
    }
}

module.exports = { registerUser, loginUser, getAllUsers, getUserById, deleteUserById, updateUser }