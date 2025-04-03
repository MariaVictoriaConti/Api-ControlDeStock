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
    
//Para las pruebas en postman usar auth BEARER TOKEN Y PONER TODO EL CHOCLO DEL TOKEN
    try {
      const decoded = jwt.verify(token, secretkey);
      console.log(decoded);
      
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token no válido' });
    }
  };



//     // Obtener el encabezado de autorización
//     const authHeader =  req.headers['authorization'];

// //Aca verificamos que haya un token en la header de la peticion y que el token este valido
//     if (!authHeader || authHeader === "Bearer " + null) {
//         console.log("El usuario no esta autorizado para realizar operaciones put, delete y post.");        
//         return res.status(401).json({ error: 'No tenés autorización para realizar esta operación.' });
//     }

//     // El token debe estar en el formato 'Bearer <token>'
//     const token =  authHeader.split(' ')[1];

//     if (!token || token === null) {
//         return res.status(401).json({ error: 'Token no proporcionado.' });
//     }

//     try {
//         // Verificar el token con jwt.verify (esto también valida la firma y la expiración)
//         const decodedToken =  jwt.verify(token, secretkey);   

//         // Guardar el usuario decodificado en req.user
//         req.user = decodedToken;
//         next(); // Continuar al siguiente middleware o ruta
//     } catch (error) {
//         // Si el token es inválido o ha expirado
//         console.log('Error al verificar el token:', error);
//         return res.status(401).json({ error: 'Token inválido o expirado' });
//     }

// }

module.exports = { authenticate };