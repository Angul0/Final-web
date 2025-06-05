let listaCarreras = [];

function guardarCarrera() {
    const clave = document.getElementById('clave').value;
    const nombre = document.getElementById('nombre').value;

    fetch('http://127.0.0.1:5000/carreras/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Clave: clave,
            Nombre: nombre
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Carrera guardada correctamente');
        actualizarTabla();
        limpiarCampos();
    })
    .catch(error => alert('Error al guardar: ' + error));
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
    const clave = document.getElementById('clave').value;
    fetch(`http://127.0.0.1:5000/carreras/consultar?clave=${clave}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const carrera = data[0];
                document.getElementById('nombre').value = carrera[2] || carrera[1]; // Ajusta el índice según tu tabla
            } else {
                alert('Carrera no encontrada');
            }
        })
        .catch(error => alert('Error al consultar: ' + error));
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
    fetch(`http://127.0.0.1:5000/carreras/eliminar?clave=${clave}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Carrera eliminada correctamente');
        actualizarTabla();
        limpiarCampos();
    })
    .catch(error => alert('Error al eliminar: ' + error));
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