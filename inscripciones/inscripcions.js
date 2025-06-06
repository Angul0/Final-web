let listaInscripciones = [];

function guardarInscripcion() {
    const nombreAlumno = document.getElementById('nombreAlumno').value;
    const carrera = document.getElementById('carrera').value;
    const semestre = document.getElementById('semestre').value;
    const turno = document.querySelector('input[name="turno"]:checked') ? document.querySelector('input[name="turno"]:checked').value : '';
    const proceso = document.querySelector('input[name="proceso"]:checked') ? document.querySelector('input[name="proceso"]:checked').value : '';
    // Debes agregar campos para Matricula_alumno e Id_Materia en tu HTML y obtenerlos aquí
    const matricula = document.getElementById('matriculaAlumno').value;
    const idMateria = document.getElementById('idMateria').value;

    if (!nombreAlumno || !carrera || !semestre || !turno || !proceso || !matricula || !idMateria) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    fetch('http://127.0.0.1:5000/inscripciones/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Matricula_alumno: matricula,
            Carrera: carrera,
            Semestre: semestre,
            Turno: turno,
            TipoDeProceso: proceso,
            Id_Materia: idMateria
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Inscripción guardada correctamente');
        actualizarTablaInscripciones();
        limpiarCamposInscripcion();
    })
    .catch(error => alert('Error al guardar: ' + error));
}

function limpiarCamposInscripcion() {
    document.getElementById('nombreAlumno').value = '';
    document.getElementById('matriculaAlumno').value = '';
    document.getElementById('idMateria').value = '';
    document.getElementById('carrera').selectedIndex = 0;
    document.getElementById('semestre').selectedIndex = 0;
    document.querySelectorAll('input[name="turno"]').forEach(r => r.checked = false);
    document.querySelectorAll('input[name="proceso"]').forEach(r => r.checked = false);
}

function actualizarTablaInscripciones() {
    fetch('http://127.0.0.1:5000/inscripciones/consultar?Matricula_alumno=' + document.getElementById('matriculaAlumno').value)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tablaInscripciones').getElementsByTagName('tbody')[0];
            tabla.innerHTML = '';
            data.forEach(inscripcion => {
                const fila = tabla.insertRow();
                fila.insertCell(0).textContent = inscripcion[1]; // Matricula_alumno
                fila.insertCell(1).textContent = inscripcion[2]; // Carrera
                fila.insertCell(2).textContent = inscripcion[3]; // Semestre
                fila.insertCell(3).textContent = inscripcion[4]; // Turno
                fila.insertCell(4).textContent = inscripcion[5]; // TipoDeProceso
                // Puedes agregar más columnas si lo deseas
            });
        });
}

function cancelarInscripcion() {
    limpiarCamposInscripcion();
}