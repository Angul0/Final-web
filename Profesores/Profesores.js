let listaProfesores = [];

function GuardarProfesor() {
    const clave = document.getElementById('clave').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    fetch('http://127.0.0.1:5000/profesores/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Clave: clave,
            Nombre: nombre,
            Telefono: telefono,
            Correo: correo
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Profesor guardado correctamente');
            actualizarTabla();
            limpiarCampos();
        } else {
            alert('Error al guardar');
        }
    });
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
    const clave = document.getElementById('clave').value;
    fetch(`http://localhost:5000/profesores/consultar?Clave=${clave}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const profesor = data[0];
                document.getElementById('nombre').value = profesor[2];
                document.getElementById('telefono').value = profesor[3];
                document.getElementById('correo').value = profesor[4];
            } else {
                alert('Profesor no encontrado');
            }
        });
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
    fetch(`http://localhost:5000/profesores/eliminar?Clave=${clave}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Profesor eliminado correctamente');
            actualizarTabla();
            limpiarCampos();
        } else {
            alert('Error al eliminar');
        }
    });
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