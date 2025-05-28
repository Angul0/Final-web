let listaProfesores = [];

function GuardarProfesor() {
    const clave = document.getElementById('clave').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    document.querySelector('button[onclick="NuevoProfesor()"]').disabled = false;
    document.querySelector('button[onclick="EditarProfesor()"]').disabled = false;
    document.querySelector('button[onclick="EliminarProfesor()"]').disabled = false;
    document.querySelector('button[onclick="ConsultarProfesor()"]').disabled = false;

    const profesor = {
        clave: clave,
        nombre: nombre,
        telefono: telefono,
        correo: correo
    };

    listaProfesores.push(profesor);
    actualizarTabla();
    limpiarCampos();
}

function limpiarCampos() {
    document.getElementById('clave').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';
}

function actualizarTabla() {
    const tabla = document.getElementById('tablaProfesores').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    listaProfesores.forEach(profesor => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = profesor.clave;
        fila.insertCell(1).textContent = profesor.nombre;
        fila.insertCell(2).textContent = profesor.telefono;
        fila.insertCell(3).textContent = profesor.correo;
    });
}

function EditarProfesor() {
    const clave = document.getElementById('clave').value;
    const profesor = listaProfesores.find(p => p.clave === clave);

    if (profesor) {
        document.getElementById('nombre').disabled = false;
        document.getElementById('telefono').disabled = false;
        document.getElementById('correo').disabled = false;
        document.getElementById('clave').disabled = true;

        document.querySelector('button[onclick="GuardarProfesor()"]').disabled = false;
        document.querySelector('button[onclick="Cancelar()"]').disabled = false;

        document.querySelector('button[onclick="NuevoProfesor()"]').disabled = true;
        document.querySelector('button[onclick="EditarProfesor()"]').disabled = true;
        document.querySelector('button[onclick="EliminarProfesor()"]').disabled = true;
        document.querySelector('button[onclick="ConsultarProfesor()"]').disabled = true;

        document.getElementById('nombre').value = profesor.nombre;
        document.getElementById('telefono').value = profesor.telefono;
        document.getElementById('correo').value = profesor.correo;

        document.querySelector('button[onclick="GuardarProfesor()"]').onclick = function () {
            profesor.nombre = document.getElementById('nombre').value;
            profesor.telefono = document.getElementById('telefono').value;
            profesor.correo = document.getElementById('correo').value;
            actualizarTabla();
            limpiarCampos();
            document.getElementById('clave').disabled = false;
            document.querySelector('button[onclick="NuevoProfesor()"]').disabled = false;
            document.querySelector('button[onclick="EditarProfesor()"]').disabled = false;
            document.querySelector('button[onclick="EliminarProfesor()"]').disabled = false;
            document.querySelector('button[onclick="ConsultarProfesor()"]').disabled = false;
            document.querySelector('button[onclick="GuardarProfesor()"]').disabled = true;
            document.querySelector('button[onclick="Cancelar()"]').disabled = true;
        };
    } else {
        alert('Profesor no encontradoa');
    }
}

function ConsultarProfesor() {
    document.getElementById('clave').disabled = true;
    document.getElementById('nombre').disabled = true;
    document.getElementById('telefono').disabled = true;
    document.getElementById('correo').disabled = true;

    document.querySelector('button[onclick="NuevoProfesor()"]').disabled = false;
    document.querySelector('button[onclick="EditarProfesor()"]').disabled = false;
    document.querySelector('button[onclick="EliminarProfesor()"]').disabled = false;
    document.querySelector('button[onclick="ConsultarProfesor()"]').disabled = false;

    document.querySelector('button[onclick="GuardarProfesor()"]').disabled = true;
    document.querySelector('button[onclick="Cancelar()"]').disabled = true;
}

function NuevoProfesor() {
    document.getElementById('clave').disabled = false;
    document.getElementById('nombre').disabled = false;
    document.getElementById('telefono').disabled = false;
    document.getElementById('correo').disabled = false;

    limpiarCampos();

    document.querySelector('button[onclick="GuardarProfesor()"]').disabled = false;
    document.querySelector('button[onclick="Cancelar()"]').disabled = false;

    document.querySelector('button[onclick="NuevoProfesor()"]').disabled = true;
    document.querySelector('button[onclick="EditarProfesor()"]').disabled = true;
    document.querySelector('button[onclick="EliminarProfesor()"]').disabled = true;
    document.querySelector('button[onclick="ConsultarProfesor()"]').disabled = true;
}

function EliminarProfesor() {
    const clave = document.getElementById('clave').value;
    const indice = listaProfesores.findIndex(p => p.clave === clave);

    if (indice !== -1) {
        listaProfesores.splice(indice, 1);
        actualizarTabla();
        limpiarCampos();
    } else {
        alert('Profesor no encontrado');
    }
}

function Cancelar() {
    limpiarCampos();
    document.getElementById('clave').disabled = false;
    document.getElementById('nombre').disabled = false;
    document.getElementById('telefono').disabled = false;
    document.getElementById('correo').disabled = false;

    document.querySelector('button[onclick="NuevoProfesor()"]').disabled = false;
    document.querySelector('button[onclick="EditarProfesor()"]').disabled = false;
    document.querySelector('button[onclick="EliminarProfesor()"]').disabled = false;
    document.querySelector('button[onclick="ConsultarProfesor()"]').disabled = false;

    document.querySelector('button[onclick="GuardarProfesor()"]').disabled = true;
    document.querySelector('button[onclick="Cancelar()"]').disabled = true;
}