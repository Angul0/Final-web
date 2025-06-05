let listaInscripciones = [];

function guardarInscripcion() {
    const nombreAlumno = document.getElementById('nombreAlumno').value;
    const carrera = document.getElementById('carrera').value;
    const semestre = document.getElementById('semestre').value;
    const turno = document.querySelector('input[name="turno"]:checked') ? document.querySelector('input[name="turno"]:checked').value : '';
    const proceso = document.querySelector('input[name="proceso"]:checked') ? document.querySelector('input[name="proceso"]:checked').value : '';

    if (!nombreAlumno || !carrera || !semestre || !turno || !proceso) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const inscripcion = {
        nombreAlumno,
        carrera,
        semestre,
        turno,
        proceso
    };

    listaInscripciones.push(inscripcion);
    actualizarTablaInscripciones();
    limpiarCamposInscripcion();
}

function limpiarCamposInscripcion() {
    document.getElementById('nombreAlumno').value = '';
    document.getElementById('carrera').selectedIndex = 0;
    document.getElementById('semestre').selectedIndex = 0;
    document.querySelectorAll('input[name="turno"]').forEach(r => r.checked = false);
    document.querySelectorAll('input[name="proceso"]').forEach(r => r.checked = false);
}

function actualizarTablaInscripciones() {
    const tabla = document.getElementById('tablaInscripciones').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    listaInscripciones.forEach(inscripcion => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = inscripcion.nombreAlumno;
        fila.insertCell(1).textContent = inscripcion.carrera;
        fila.insertCell(2).textContent = inscripcion.semestre;
        fila.insertCell(3).textContent = inscripcion.turno;
        fila.insertCell(4).textContent = inscripcion.proceso;
    });
}

function cancelarInscripcion() {
    limpiarCamposInscripcion();
}