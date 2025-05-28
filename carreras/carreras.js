let listaCarreras = [];

function guardarCarrera() {
    const clave = document.getElementById('clave').value;
    const nombre = document.getElementById('nombre').value;

    document.querySelector('button[onclick="nuevaCarrera()"]').disabled = false;
    document.querySelector('button[onclick="editarCarrera()"]').disabled = false;
    document.querySelector('button[onclick="eliminarCarrera()"]').disabled = false;
    document.querySelector('button[onclick="consultarCarrera()"]').disabled = false;

    const carrera = {
        clave: clave,
        nombre: nombre
    };

    listaCarreras.push(carrera);
    actualizarTabla();
    limpiarCampos();
}

function limpiarCampos() {
    document.getElementById('clave').value = '';
    document.getElementById('nombre').value = '';
}

function actualizarTabla() {
    const tabla = document.getElementById('tablaCarreras').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    listaCarreras.forEach(carrera => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = carrera.clave;
        fila.insertCell(1).textContent = carrera.nombre;
    });
}

function editarCarrera() {
    const clave = document.getElementById('clave').value;
    const carrera = listaCarreras.find(c => c.clave === clave);

    if (carrera) {
        document.getElementById('nombre').disabled = false;
        document.getElementById('clave').disabled = true;

        document.querySelector('button[onclick="guardarCarrera()"]').disabled = false;
        document.querySelector('button[onclick="cancelarCarrera()"]').disabled = false;

        document.querySelector('button[onclick="nuevaCarrera()"]').disabled = true;
        document.querySelector('button[onclick="editarCarrera()"]').disabled = true;
        document.querySelector('button[onclick="eliminarCarrera()"]').disabled = true;
        document.querySelector('button[onclick="consultarCarrera()"]').disabled = true;

        document.getElementById('nombre').value = carrera.nombre;

        document.querySelector('button[onclick="guardarCarrera()"]').onclick = function () {
            carrera.nombre = document.getElementById('nombre').value;
            actualizarTabla();
            limpiarCampos();
            document.getElementById('clave').disabled = false;
            document.querySelector('button[onclick="nuevaCarrera()"]').disabled = false;
            document.querySelector('button[onclick="editarCarrera()"]').disabled = false;
            document.querySelector('button[onclick="eliminarCarrera()"]').disabled = false;
            document.querySelector('button[onclick="consultarCarrera()"]').disabled = false;
            document.querySelector('button[onclick="guardarCarrera()"]').disabled = true;
            document.querySelector('button[onclick="cancelarCarrera()"]').disabled = true;
        };
    } else {
        alert('Carrera no encontrada');
    }
}

function consultarCarrera() {
    document.getElementById('clave').disabled = true;
    document.getElementById('nombre').disabled = true;

    document.querySelector('button[onclick="nuevaCarrera()"]').disabled = false;
    document.querySelector('button[onclick="editarCarrera()"]').disabled = false;
    document.querySelector('button[onclick="eliminarCarrera()"]').disabled = false;
    document.querySelector('button[onclick="consultarCarrera()"]').disabled = false;

    document.querySelector('button[onclick="guardarCarrera()"]').disabled = true;
    document.querySelector('button[onclick="cancelarCarrera()"]').disabled = true;
}

function nuevaCarrera() {
    document.getElementById('clave').disabled = false;
    document.getElementById('nombre').disabled = false;

    limpiarCampos();

    document.querySelector('button[onclick="guardarCarrera()"]').disabled = false;
    document.querySelector('button[onclick="cancelarCarrera()"]').disabled = false;

    document.querySelector('button[onclick="nuevaCarrera()"]').disabled = true;
    document.querySelector('button[onclick="editarCarrera()"]').disabled = true;
    document.querySelector('button[onclick="eliminarCarrera()"]').disabled = true;
    document.querySelector('button[onclick="consultarCarrera()"]').disabled = true;
}

function eliminarCarrera() {
    const clave = document.getElementById('clave').value;
    const indice = listaCarreras.findIndex(c => c.clave === clave);

    if (indice !== -1) {
        listaCarreras.splice(indice, 1);
        actualizarTabla();
        limpiarCampos();
    } else {
        alert('Carrera no encontrada');
    }
}

function cancelarCarrera() {
    limpiarCampos();
    document.getElementById('clave').disabled = false;
    document.getElementById('nombre').disabled = false;

    document.querySelector('button[onclick="nuevaCarrera()"]').disabled = false;
    document.querySelector('button[onclick="editarCarrera()"]').disabled = false;
    document.querySelector('button[onclick="eliminarCarrera()"]').disabled = false;
    document.querySelector('button[onclick="consultarCarrera()"]').disabled = false;

    document.querySelector('button[onclick="guardarCarrera()"]').disabled = true;
    document.querySelector('button[onclick="cancelarCarrera()"]').disabled = true;
}