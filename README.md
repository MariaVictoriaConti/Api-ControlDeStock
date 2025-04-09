# 🌸 AROMANZA - Tienda de aromas, sahumerios y difusores 🌸

**Aromanza** se especializa en la gestión de ventas de sahumerios artesanales, difusores ambientales y esencias seleccionadas para equilibrar tus espacios y acompañarte en tu bienestar diario. Esta API RESTful fue desarrollada para gestionar eficientemente el stock de productos disponibles en la tienda. Además, permite llevar un registro ordenado de entradas y salidas del inventario, facilitando la gestión del almacén y el seguimiento de productos.

## Tecnologías Utilizadas

- **Node.js** + **Express.js**: para la lógica de la API.
- **MongoDB** con **Mongoose**: para la base de datos.
- **bcrypt**: utilizado para hashear contraseñas de manera segura.
- **dotenv**: para configuración de entorno.
- **jsonwebtoken**: generación y validación de tokens para autenticación.
- **cors**: para el manejo seguro de peticiones y solicitudes.

---

## Estructura del Proyecto

### 1. `app.js`

Es el punto de entrada principal de la API. Aquí se configuran las dependencias necesarias y se inicia el servidor.

### 2. **Rutas** (`Routes/routes.js`)

En este archivo se definen las rutas relacionadas tanto de los productos como de los usuarios.

### 3. **Controladores** (`Controllers/productController.js`, `Controllers/userController.js`)

Gestiona el control del inventario de productos y el registro de usuarios.

- **`productController.js`**: 
  - **`getAllProducts`**: Obtiene una lista de todos los productos.
  - **`getProductById`**: Obtiene un producto específico por su ID.
  - **`addProduct`**: Añade un nuevo producto a la base de datos.
  - **`updateProductById`**: Actualiza los detalles del producto por su ID.
  - **`deleteProductById`**: Elimina un producto de la base de datos por su ID.
  - **`getProductsByCategory`**: Obtiene productos por categoría.

- **`userController.js`**:
  - **`registerUser`**: Registra un nuevo usuario. Verifica que se proporcionen un correo electrónico y una contraseña, comprueba si el usuario ya existe, hashea la contraseña y guarda el nuevo usuario en la base de datos.
  - **`loginUser`**: Inicia sesión a un usuario existente y genera un token JWT para el acceso.
  - **`getAllUsers`**: Obtiene todos los usuarios de la base de datos.
  - **`getUserById`**: Obtiene los detalles de un usuario específico utilizando su ID.
  - **`updateUserById`**: Actualiza la información de un usuario específico basado en su ID.
  - **`deleteUserById`**: Elimina un usuario de la base de datos utilizando su ID.

  
### 4. **Middlewares** (`MiddLewares/auth.js`, `MiddLewares/loginLimiter.js`)

- **`auth.js`**: Verifica el token JWT de las solicitudes para asegurarse de que el usuario esté autenticado antes de acceder a rutas protegidas.
- **`loginLimiter.js`**: Utilizado para limitar la cantidad de intentos de inicio de sesión, protegiendo la API contra ataques de fuerza bruta.

### 5. **Base de Datos** (`DataBase/dataBase.js`)

El archivo configura la conexión a MongoDB usando Mongoose. Define una función que conecta la aplicación a la base de datos utilizando la URI almacenada en las variables de entorno. 

### 6. **Modelos** (`Models/productModel.js`, `Models/userModel.js`)

- **`productModel.js`**: Define el esquema para los productos en la base de datos. Cada producto tiene un nombre, precio, descripción, cantidad y una propiedad de disponibilidad (si está disponible o no). Este modelo se usa para interactuar con la colección de productos en MongoDB.
- **`userModel.js`**: Define el esquema de los usuarios que interactúan con la API, especificando los campos esenciales como correo electrónico y contraseña.

### 7. Público (`public/`)

El directorio `/public` contiene los archivos de la interfaz de usuario (frontend). Aquí se encuentran los archivos necesarios para interactuar con la API a través de una interfaz web, tales como `index.html`, `style.css` y `script.js`.

---

## Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/MariaVictoriaConti/Api-ControlDeStock.git

   ```
2. Instalar las dependencias:
   ```bash
   npm install express mongoose bcrypt dotenv cors jsonwebtoken express-rate-limit  
   ```
3. Ejecutar el servidor:
   ```bash
   npm run dev
   ```
   O también se puede utilizar el siguiente comando:
   ```bash
   npm start
   ```

---

## Uso del Sistema

### **Usuarios**

Todos los usuarios pueden acceder a las siguientes funciones:

-**Ver todos los productos**: Permite acceder a la lista de todos los productos disponibles en el catálogo.

-**Buscar producto por ID**: Busar un producto en específico según su ID.

- **Registrar una cuenta de usuario**: Crear una cuenta proporcionando correo y contraseña.

El sistema permite a los usuarios registrados realizar las siguientes acciones:

- **Iniciar sesión**: Autenticarse con correo y contraseña, generando un token JWT.
- **Consultar productos**: Ver la lista completa de los productos disponibles. Se puede filtrar por su ID.
- **Gestionar productos**: Agregar, editar o eliminar productos del inventario. 


### **Autenticación con JWT**

Las rutas protegidas requieren que los usuarios estén autenticados mediante un **token JWT**. El token se obtiene al iniciar sesión y debe incluirse en el encabezado de las solicitudes a rutas protegidas.

---

### **Frontend**

Esta interfaz permite interactuar con la gestión de productos de la tienda y los usuarios. Incluye los siguientes elementos:

- **Formulario de registro de usuario**: Permite a los usuarios crear una cuenta proporcionando su correo y contraseña.
- **Formulario de inicio de sesión**: Los usuarios pueden ingresar su correo y contraseña para autenticarse y obtener un token JWT.
- **Interfaz de visualización de productos**: Muestra la lista de productos disponibles, permitiendo filtrar por su ID. Los usuarios pueden consultar los detalles de cada producto.
- **Botón para agregar o actualizar productos**: Permite a los usuarios agregar o actualizar productos. Sólo visible para usuarios con permiso.

---

### **Notas**

- En esta API Rest también se incluyeron funciones específicas para la gestión de usuarios, pero que no se encuentran vinculadas al Frontend. Recomendamos el uso de Postman para acceder a estas funciones. 
- Para las pruebas en Postman de las funciones que requieren autenticación (`addProduct`, `updateProductById` y `deleteProductById`) es necesario utilizar la opción 'Auth Bearer Token' y poner el token en su totalidad. 