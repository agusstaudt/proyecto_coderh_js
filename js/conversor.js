// Función para remover acentos
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Clase Moneda
class Moneda {
    constructor(nombre_moneda, precio, monto, signoMoneda) {
        this.nombre_moneda = nombre_moneda;
        this.precio = parseFloat(precio);
        this.monto = parseFloat(monto);
        this.signoMoneda = signoMoneda;
    }
    Cotizacion() {
        return Math.round(this.monto / this.precio);
    }
}

// Función para mostrar resultados en el DOM
const mostrarResultados = (divisas) => {
    const resultadosContainer = document.getElementById('resultados');
    resultadosContainer.innerHTML = ''; // Limpiar resultados anteriores

    divisas.forEach(divisa => {
        console.log('Mostrando divisa:', divisa); // Mensaje de depuración
        const divisaElement = document.createElement('div');
        divisaElement.innerHTML = `
            <h3>Divisa: ${divisa.nombre_moneda}</h3>
            <h4>Cotización: ${divisa.signoMoneda} ${divisa.precio}</h4>
            <h4>Monto: ${signoMonedaLocal} ${divisa.monto}</h4>
            <h4>Cambio: ${divisa.signoMoneda} ${divisa.Cotizacion()}</h4>
        `;
        resultadosContainer.appendChild(divisaElement);
    });
};

// Función para guardar datos en localStorage
const guardarEnLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
};

// Función para obtener datos de localStorage
const obtenerDeLocalStorage = (clave) => {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
};

// Función para convertir objetos literales a instancias de Moneda
const convertirAInstanciaMoneda = (obj) => {
    return new Moneda(obj.nombre_moneda, obj.precio, obj.monto, obj.signoMoneda);
};

// Manejar el evento de consulta de divisas
const manejarConsultaDivisas = () => {
    console.log("El evento click fue capturado."); // Mensaje de depuración

    const divisaInput = document.getElementById('divisa').value;
    const montoInput = document.getElementById('monto').value;

    if (!divisaInput || !montoInput) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, complete todos los campos.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const nombreD = removeAccents(divisaInput.toLowerCase());
    const montoD = parseFloat(montoInput);
    let precioD;
    let signoMonedaExtranjera;

    if (nombreD === 'real') {
        precioD = 264;
        signoMonedaExtranjera = "R$ ";
    } else if (nombreD === 'dolar') {
        precioD = 1440;
        signoMonedaExtranjera = "USD ";
    } else if (nombreD === 'guarani') {
        precioD = 0.12;
        signoMonedaExtranjera = "Gs. ";
    } else {
        Swal.fire({
            title: 'Nombre no válido!',
            text: 'Por favor, vuelva a ingresar la consulta.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const nuevaDivisa = new Moneda(nombreD, precioD, montoD, signoMonedaExtranjera);
    const arrayDivisas = obtenerDeLocalStorage('divisasConsultadas') || [];
    arrayDivisas.push(nuevaDivisa);

    // Guardar en localStorage
    guardarEnLocalStorage('divisasConsultadas', arrayDivisas);

    // Convertir a instancias de Moneda y mostrar resultados en el DOM
    const instanciasDivisas = arrayDivisas.map(convertirAInstanciaMoneda);
    mostrarResultados(instanciasDivisas);

    Swal.fire({
        title: 'Consulta exitosa!',
        text: 'La consulta se realizó correctamente.',
        icon: 'success',
        confirmButtonText: 'Genial'
    });
};

// Función para manejar el evento de limpiar consultas
const manejarLimpiarConsultas = () => {
    Swal.fire({
        title: '¿Está seguro de eliminar las consultas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('divisasConsultadas');
            const resultadosContainer = document.getElementById('resultados');
            resultadosContainer.innerHTML = ''; // Limpiar resultados del DOM
            console.log('Consultas limpiadas'); // Mensaje de depuración
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'Todas las consultas se han eliminado.'
            });
        }
    });
};

// Evento al cargar la página
window.onload = () => {
    // Limpiar el localStorage al cargar la página
    localStorage.removeItem('divisasConsultadas');
};

// Asignar evento al botón o elemento que inicie la consulta
const btnConsultarDivisas = document.getElementById('btnConsultarDivisas');
if (btnConsultarDivisas) {
    btnConsultarDivisas.addEventListener('click', manejarConsultaDivisas);
}

// Asignar evento al botón de limpiar consultas
const btnLimpiarConsultas = document.getElementById('btnLimpiarConsultas');
if (btnLimpiarConsultas) {
    btnLimpiarConsultas.addEventListener('click', manejarLimpiarConsultas);
}

// Definir signo de moneda local
let signoMonedaLocal = "$AR ";