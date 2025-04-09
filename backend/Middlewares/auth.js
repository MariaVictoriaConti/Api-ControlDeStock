const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

async function authenticate (req, res, next) {
    const authHeader = req.headers['authorization'] 
    //console.log(authHeader);

    if (!authHeader || authHeader === "Bearer " + null) {
        console.log("El usuario no esta autorizado para realizar operaciones put, delete y post.");        
        return res.status(401).json({ error: 'No tenés autorización.' });
    }
  
    // El token debe estar en el formato 'Bearer <token>'
    const token =  authHeader.split(' ')[1];
    //console.log(token);
    
    try {
      const decoded = jwt.verify(token, secretkey);
      console.log(decoded);
      
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token no válido' });
    }
  };


module.exports = { authenticate };