//Script del front que hace fetchs con el backend

const PORT = 5500;
// Función para cargar productos desde la API de MongoDB
const url = `http://localhost:${PORT}/`;



// Script GET ALL PRODUCTS
document.getElementById("Data").addEventListener("click", function () {
    const resultDiv = document.getElementById("result");

    // Verificamos si las tarjetas ya están visibles
    if (resultDiv.style.display === "flex") {
        // Si las tarjetas están visibles, las ocultamos
        resultDiv.style.display = "none";
    } else {
        // Si las tarjetas están ocultas, las mostramos

        fetch(`${url}allProducts`)
            .then(response => response.json())
            // La info que devuelve el controlador (lista de alumnos) llega como 'data'
            .then(data => {
                console.log(data);
                let html = "";
                // Por cada estudiante de la lista se va a imprimir en el html una card con los datos de cada alumno.
                // Modelos de card sacados de librería boostrap
                data.forEach(product => {
                    html += `<div class="cardTodas">


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



// Script GET PRODUCT BY ID
    document.getElementById("buscarById").addEventListener("click", function () {
        document.getElementById("productByIdForm").style.display = "block";
    })
    
    // Ocultar el formulario si se hace clic en "Cancelar"
    document.getElementById("cancelBtn3").addEventListener("click", function () {
        document.getElementById("productByIdForm").style.display = "none";
    });    
    
    // Manejar la acción de envío del formulario
    document.getElementById("productForm1").addEventListener("submit", function (e) {
        e.preventDefault();
        // Se toma el valor que el usuario pone en el input (id del alumno buscado) y se guarda en una constante
        const id = document.getElementById("idProductById").value;
        // El id se pasa como el parametro al endpoint de peticion al back
        fetch(`${url}${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                // Info del estudiante que retorna lo renderiza en el html
                // Si no encontró ningun alumno sale un alerta. 
                if (data.name === undefined) {
                    alert('Producto no encontrado')
                } else {
                    let html = `<div class="col-md-4 cardTodas">
                                <div class="card-getById">
                                    <div class="card-body">
                                        <h5 class="card-title">Nombre: ${data.name}</h5>
                                        <p class="card-text">${data.description}</p>
                                        <p class="card-text">ID: ${data._id}</p>
                                        <p class="card-text">Cantidad disponible: ${data.quantity}</p>
                                        <p class="card-text">Precio: ${data.price}</p>
                                    </div>
                                    </div>
                                </div>`;
                        document.getElementById("result").innerHTML = html;
                        document.getElementById("cancelBtn3").addEventListener("click", function () {
                            document.getElementById("result").style.display = "none";
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
    
