// Base de datos simulada
const BD = [
    {id: 1, nombre: 'Introducción al aprendizaje automático', precio: 65000},
    {id: 2, nombre: 'Tópicos en macroeconomía', precio: 25000},
    {id: 3, nombre: 'Inicios a la programación estadística', precio: 35000},
    {id: 4, nombre: 'Introducción a la visualización de datos', precio: 35000},
    {id: 5, nombre: 'Ciencias sociales computacional', precio: 45000},
    {id: 6, nombre: 'Diplomatura en ciencia de datos', precio: 65000},
];

// Función que simula el pedido de productos
const pedirProductos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(BD);
        }, 3000);
    });
};

// Inicializamos con un array vacío
let productos = [];

// Función para renderizar los productos en el DOM
const renderProductos = (arr) => {
    const container = document.getElementById('productosContainer');
    container.innerHTML = ''; // Limpiar contenedor

    arr.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'col-md-6 col-lg-4 col-xl-3 product-box'; // Añadir clase de columna de Bootstrap y clase para estilos
        productoElement.innerHTML = `
            <div class="product-inner-box">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <a href="pages/coming-soon.html" class="coming-soon-link">Coming soon</a>
            </div>
        `;
        container.appendChild(productoElement);
    });
};

// Asincrónicamente pedimos los datos y generamos la vista
pedirProductos()
    .then((res) => {
        productos = res;
        renderProductos(productos);
    });