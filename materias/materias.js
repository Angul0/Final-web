let listaMaterias = [];

function guardarMateria() {
    const id_carrera = document.getElementById('idCarrera').value;
    const nombre = document.getElementById('nombreMateria').value;
    const aula = document.getElementById('aula').value;
    const semestre = document.getElementById('semestre').value;

    fetch('http://127.0.0.1:5000/materias/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_carrera: id_carrera,
            nombre: nombre,
            aula: aula,
            semestre: semestre
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Materia guardada correctamente');
        actualizarTablaMaterias();
        limpiarCamposMateria();
    })
    .catch(error => alert('Error al guardar: ' + error));
}

function limpiarCamposMateria() {
    document.getElementById('claveMateria').value = '';
    document.getElementById('idCarrera').value = '';
    document.getElementById('nombreMateria').value = '';
    document.getElementById('aula').value = '';
    document.getElementById('semestre').value = '';
}

function actualizarTablaMaterias() {
    fetch('http://127.0.0.1:5000/materias/todas')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tablaMaterias').getElementsByTagName('tbody')[0];
            tabla.innerHTML = '';
            data.forEach(materia => {
                const fila = tabla.insertRow();
                fila.insertCell(0).textContent = materia[0]; // id
                fila.insertCell(1).textContent = materia[1]; // id_carrera
                fila.insertCell(2).textContent = materia[2]; // nombre
                fila.insertCell(3).textContent = materia[3]; // aula
                fila.insertCell(4).textContent = materia[4]; // semestre
            });
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
    const id = document.getElementById('claveMateria').value;
    fetch(`http://127.0.0.1:5000/materias/consultar?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const materia = data[0];
                document.getElementById('claveMateria').value = materia[0];
                document.getElementById('idCarrera').value = materia[1];
                document.getElementById('nombreMateria').value = materia[2];
                document.getElementById('aula').value = materia[3];
                document.getElementById('semestre').value = materia[4];
            } else {
                alert('Materia no encontrada');
            }
        })
        .catch(error => alert('Error al consultar: ' + error));
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
    const id = document.getElementById('claveMateria').value;
    fetch(`http://127.0.0.1:5000/materias/eliminar?id=${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Materia eliminada correctamente');
        actualizarTablaMaterias();
        limpiarCamposMateria();
    })
    .catch(error => alert('Error al eliminar: ' + error));
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

window.onload = actualizarTablaMaterias;