//Script del front que hace fetchs con el backend


const PORT = 5500;
// Función para cargar productos desde la API de MongoDB
const url = '/' //`http://localhost:${PORT}`; //'https://controldestock.onrender.com'



//-------------------------- Script GET ALL PRODUCTS-----------------------------
document.getElementById("Data").addEventListener("click", function () {
    const resultDiv = document.getElementById("result");

    // Verificamos si las tarjetas ya están visibles
    if (resultDiv.style.display === "flex") {
        // Si las tarjetas están visibles, las ocultamos
        resultDiv.style.display = "none";
    } else {
        // Si las tarjetas están ocultas, las mostramos
        fetch(`${url}/allProducts`)
            .then(response => response.json())
            // La info que devuelve el controlador (lista de productos) llega como 'data'
            .then(data => {
                console.log(data);
                let html = "";
                // Modelos de card sacados de librería boostrap
                data.forEach(product => {
                    html += `<div class="cardTodas">
                                    <img src="./img/sahumerios.jpg" alt="producto" class="card-img-top">
                                    <h2 class="card-title">${product.name}</h2>
                                    <p class="card-text">${product.description}</p>
                                    <p class="card-text">ID: ${product._id}</p>
                                    <p class="card-text">Cantidad disponible: ${product.quantity}</p>
                                    <p class="card-text">Precio: ${product.price}</p>
                        </div>`;
                });
                // Insertar el HTML generado en el contenedor
                resultDiv.innerHTML = html;
                resultDiv.style.display = "flex"; // Mostrar las tarjetas
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});



//------------------------------------ Script GET PRODUCT BY ID------------------------------------ 
document.getElementById("buscarById").addEventListener("click", function () {
    document.getElementById("productByIdForm").style.display = "block";
})

// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn1").addEventListener("click", function () {
    document.getElementById("productByIdForm").style.display = "none";
});

// Manejar la acción de envío del formulario
document.getElementById("productForm1").addEventListener("submit", function (e) {
    e.preventDefault();
    // Se toma el valor que el usuario pone en el input (id del producto buscado) y se guarda en una constante
    const id = document.getElementById("idProductById").value;
    // El id se pasa como el parametro al endpoint de peticion al back
    fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            // Info del producto que retorna lo renderiza en el html
            // Si no encontró ningun producto sale un alerta. 
            console.log(data)
            if (data.message === 'Producto no encontrado.') {
                alert('Producto no encontrado')
            } else {
                let html = `<div class="col-md-4 cardTodas">
                                <div class="card-getById">
                                    <div class="card-body">
                                    <img src="./img/sahumerios.jpg" alt="producto" class="card-img-top">
                                        <h5 class="card-title">Nombre: ${data.name}</h5>
                                        <p class="card-text">${data.description}</p>
                                        <p class="card-text">ID: ${data._id}</p>
                                        <p class="card-text">Cantidad disponible: ${data.quantity}</p>
                                        <p class="card-text">Precio: ${data.price}</p>
                                    </div>
                                    </div>
                                </div>`;
                document.getElementById("result").innerHTML = html;
                document.getElementById("cancelBtn1").addEventListener("click", function () {
                    document.getElementById("result").style.display = "none";
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


//------------------------------- Script para GET PRODUCTS by catgory (name)-------------------------------

// Obtener todos los enlaces de categorías
const categoryLinks = document.querySelectorAll('.category-link');

// Función para manejar clics en los enlaces
categoryLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();  // Evita el comportamiento por defecto del <a>

        const category = link.getAttribute('data-category');  // Obtener categoría del atributo 'data-category'

        // Llamar a la función para cargar los productos de esa categoría
        loadProductsByCategory(category);
    });
});

// Función para cargar los productos por categoría
async function loadProductsByCategory(category) {
    try {
        // Hacer la solicitud al backend para obtener los productos
        const response = await fetch(`${url}/products/${category}`);

        const products = await response.json();  // Convertir la respuesta a JSON

        // Obtener el contenedor de productos y limpiarlo
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';  // Limpiar productos anteriores

        // Verificar si se encontraron productos
        if (response.status === 404) {
            alert("No hay productos en esta categoria");
            productList.innerHTML = `<li>No hay productos en esta categoría</li>`;
        } else {
            // Mostrar los productos
            products.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('product-item');
                li.innerHTML = `
                  <img src="./img/sahumerios.jpg" alt="producto" class="card-img-top">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Id: ${product._id}</p>
                    <p>Precio: $${product.price}</p>
                    <p>Cantidad: ${product.quantity}</p>
                `;
                productList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        const productList = document.getElementById('product-list');
        alert("Error al cargar los productos");
    }
}



//------------------------------------- Script para ADD PRODUCT-------------------------------------
document.getElementById("addById").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("productByIdFormComplete").style.display = "block";
    document.getElementById("cancelBtn2").addEventListener("click", function () {
        document.getElementById("productByIdFormComplete").style.display = "none";
    });
})
document.getElementById("productForm2").addEventListener("submit", function (e) {
    e.preventDefault();
    // Se toma el valor que el usuario pone en el input (id del producto buscado) y se guarda en una constante
    const name = document.getElementById("nameProductById").value;
    const description = document.getElementById("descriptionProductById").value;
    const price = document.getElementById("priceProductById").value;
    const quantity = document.getElementById("quantityProductById").value;
    const disponibility = document.getElementById("disponibilityProductById").value;

    // Enviamos la solicitud de registro al back
    fetch(`${url}/addProduct`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({ name, description, price, quantity, disponibility })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Producto agregado con exito!') {
                alert("Producto agregado con exito!")
                document.getElementById("productByIdFormComplete").style.display = "none";
            } else {
                alert("Error al agregar el producto.")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

//----------------------------------Script para UPDATE PRODUCT BY ID----------------------------------
document.getElementById("updateById").addEventListener("click", function (e) {
    e.preventDefault();

    document.getElementById("updateproductByIdFormComplete").style.display = "block";
    document.getElementById("cancelBtnUpdate").addEventListener("click", function () {
        document.getElementById("updateproductByIdFormComplete").style.display = "none";
    });
})
document.getElementById("productFormUpdate").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("idUpdateProductById").value;
    const name = document.getElementById("nameUpdateProductById").value;
    const description = document.getElementById("descriptionUpdateProductById").value;
    const price = document.getElementById("priceUpdateProductById").value;
    const quantity = document.getElementById("quantityUpdateProductById").value;
    const disponibility = document.getElementById("disponibilityUpdateProductById").value;
    
    // Enviamos la solicitud de registro al back
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({ name, description, price, quantity, disponibility })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Producto actualizado con exito!') {
                alert("Producto actualizado con exito!")
            } else {
                alert("Error al actualizar el producto.")
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

//---------------------------Script para DELETE product by ID---------------------------
document.getElementById("deleteById").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("deleteProductByIdForm").style.display = "block";
    document.getElementById("cancelBtnDelete").addEventListener("click", function () {
        document.getElementById("deleteProductForm1").style.display = "none";
    });
})
document.getElementById("deleteProductForm1").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("idDeleteProductById").value;

    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Producto eliminado con exito!') {
                alert("Producto eliminado con exito!")
                if (window.sessionStorage.getItem('token')) {
                    document.getElementById("loginForm").style.display = "none";
                    document.getElementById("updateById").style.display = "block";
                    document.getElementById("deleteById").style.display = "block";
                    document.getElementById("addById").style.display = "block";
                }
            } else if (data.message === 'Producto inexistente.'){
                alert('El producto no existe.')
            } else {
                alert('Error al eliminar el producto.')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

});



//------------------------------Script para formulario de REGISTER------------------------------
document.getElementById("registerFormNavBar").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("registerForm").style.display = "block";
})
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Extremos y guardamos en constantes el email y contraseña ingresadas en los inputs
    const email = document.getElementById("floatingInputEmailRes").value;
    const password = document.getElementById("floatingInputPasswordReg").value;

    // Enviamos la solicitud de registro al back
    fetch(`${url}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => { // Comparamos la respuesta que retorna del controlador para enviar el alerta al usuario
            if (data.message === 'Usuario registrado con exito.') {
                alert("Usuario registrado con exito!")
                document.getElementById("registerForm").style.display = "none";
            } else if (data.status === 400){
                alert("El usuario ya existe.")
            } else if (data.message === 'Campos incompletos.') {
                alert('Campos incompletos.')
            }
        })
        .catch(error => {
            console.log("Error de registro-catch script", error);
            alert("Hubo un error al registrar el usuario, intente nuevamente.")
        });
});


//---------------------------Script para formulario de LOGIN-------------------------------
document.getElementById("loginFormNavBar").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("loginForm").style.display = "block";
})
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Extremos y guardamos en constantes el email y contraseña ingresadas en los inputs
    const email = document.getElementById("floatingInput").value;
    const password = document.getElementById("floatingTelefono").value;

    // Enviamos la solicitud de registro al back
    fetch(`${url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => { // Comparamos la respuesta que retorna del controlador para enviar el alerta al usuario
            if (data.message === "Usuario no registrado.") {
                alert("Error. El email no está registrado o es incorrecto.")
            } else if (data.message === 'Contraseña incorrecta') {
                alert("Error. La contraseña es incorrecta.")
            } else {

                // Si la solicitud es exitosa, toma el token que se envia del controlador. Con el metodo split() los dividimos para extraer el payload
                const partsToken = data.token.split('.')

                // El payload se guarda en una constante
                const payload = partsToken[1]

                // Esa constante se pasa al sessionStorage del navegador, que va a persistir mientras el navegador esté abierto
                // Una vez que el navgador se cierra, la informacion ahi reservada se elimina.
                // En las rutas protegidas se realiza un getItem() para validar los accesos.
                window.sessionStorage.setItem('token', data.token)
                alert("Inicio de sesión exitoso!")
                document.getElementById("loginForm").style.display = "none";
                document.getElementById("updateById").style.display = "block";
                document.getElementById("deleteById").style.display = "block";
                document.getElementById("addById").style.display = "block";
            }
        })
        .catch(error => {
            console.log("Muchos intentos al ingresar-catch script", error);
            alert("Muchos intentos de login, intente en unos minutos.")
        });
});