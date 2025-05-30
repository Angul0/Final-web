let listaMaterias = [];

function guardarMateria() {
    const clave = document.getElementById('claveMateria').value;
    const nombre = document.getElementById('nombreMateria').value;

    document.querySelector('button[onclick="nuevaMateria()"]').disabled = false;
    document.querySelector('button[onclick="editarMateria()"]').disabled = false;
    document.querySelector('button[onclick="eliminarMateria()"]').disabled = false;
    document.querySelector('button[onclick="consultarMateria()"]').disabled = false;

    const materia = {
        clave: clave,
        nombre: nombre
    };

    listaMaterias.push(materia);
    actualizarTablaMaterias();
    limpiarCamposMateria();
}

function limpiarCamposMateria() {
    document.getElementById('claveMateria').value = '';
    document.getElementById('nombreMateria').value = '';
}

function actualizarTablaMaterias() {
    const tabla = document.getElementById('tablaMaterias').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    listaMaterias.forEach(materia => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = materia.clave;
        fila.insertCell(1).textContent = materia.nombre;
    });
}

function editarMateria() {
    const clave = document.getElementById('claveMateria').value;
    const materia = listaMaterias.find(m => m.clave === clave);

    if (materia) {
        document.getElementById('nombreMateria').disabled = false;
        document.getElementById('claveMateria').disabled = true;

        document.querySelector('button[onclick="guardarMateria()"]').disabled = false;
        document.querySelector('button[onclick="cancelarMateria()"]').disabled = false;

        document.querySelector('button[onclick="nuevaMateria()"]').disabled = true;
        document.querySelector('button[onclick="editarMateria()"]').disabled = true;
        document.querySelector('button[onclick="eliminarMateria()"]').disabled = true;
        document.querySelector('button[onclick="consultarMateria()"]').disabled = true;

        document.getElementById('nombreMateria').value = materia.nombre;

        document.querySelector('button[onclick="guardarMateria()"]').onclick = function () {
            materia.nombre = document.getElementById('nombreMateria').value;
            actualizarTablaMaterias();
            limpiarCamposMateria();
            document.getElementById('claveMateria').disabled = false;
            document.querySelector('button[onclick="nuevaMateria()"]').disabled = false;
            document.querySelector('button[onclick="editarMateria()"]').disabled = false;
            document.querySelector('button[onclick="eliminarMateria()"]').disabled = false;
            document.querySelector('button[onclick="consultarMateria()"]').disabled = false;
            document.querySelector('button[onclick="guardarMateria()"]').disabled = true;
            document.querySelector('button[onclick="cancelarMateria()"]').disabled = true;
        };
    } else {
        alert('Materia no encontrada');
    }
}

function consultarMateria() {
    document.getElementById('claveMateria').disabled = true;
    document.getElementById('nombreMateria').disabled = true;

    document.querySelector('button[onclick="nuevaMateria()"]').disabled = false;
    document.querySelector('button[onclick="editarMateria()"]').disabled = false;
    document.querySelector('button[onclick="eliminarMateria()"]').disabled = false;
    document.querySelector('button[onclick="consultarMateria()"]').disabled = false;

    document.querySelector('button[onclick="guardarMateria()"]').disabled = true;
    document.querySelector('button[onclick="cancelarMateria()"]').disabled = true;
}

function nuevaMateria() {
    document.getElementById('claveMateria').disabled = false;
    document.getElementById('nombreMateria').disabled = false;

    limpiarCamposMateria();

    document.querySelector('button[onclick="guardarMateria()"]').disabled = false;
    document.querySelector('button[onclick="cancelarMateria()"]').disabled = false;

    document.querySelector('button[onclick="nuevaMateria()"]').disabled = true;
    document.querySelector('button[onclick="editarMateria()"]').disabled = true;
    document.querySelector('button[onclick="eliminarMateria()"]').disabled = true;
    document.querySelector('button[onclick="consultarMateria()"]').disabled = true;
}

function eliminarMateria() {
    const clave = document.getElementById('claveMateria').value;
    const indice = listaMaterias.findIndex(m => m.clave === clave);

    if (indice !== -1) {
        listaMaterias.splice(indice, 1);
        actualizarTablaMaterias();
        limpiarCamposMateria();
    } else {
        alert('Materia no encontrada');
    }
}

function cancelarMateria() {
    limpiarCamposMateria();
    document.getElementById('claveMateria').disabled = false;
    document.getElementById('nombreMateria').disabled = false;

    document.querySelector('button[onclick="nuevaMateria()"]').disabled = false;
    document.querySelector('button[onclick="editarMateria()"]').disabled = false;
    document.querySelector('button[onclick="eliminarMateria()"]').disabled = false;
    document.querySelector('button[onclick="consultarMateria()"]').disabled = false;

    document.querySelector('button[onclick="guardarMateria()"]').disabled = true;
    document.querySelector('button[onclick="cancelarMateria()"]').disabled = true;
}