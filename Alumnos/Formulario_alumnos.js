var listaAlumnos = [];
const boton ={


}


function GuardarAlumno() {
    const matricula = document.getElementById('matricula').value;
    const nombre = document.getElementById('nombre').value;
    const numero = document.getElementById('numero').value;
    const correo = document.getElementById('correo').value;

    fetch('http://127.0.0.1:5000/alumnos/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Matricula: matricula,
            Nombre: nombre,
            Telefono: numero,
            Correo: correo
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Alumno guardado correctamente');
        actualizarTabla();
        limpiarCampos();
    })
    .catch(error => alert('Error al guardar: ' + error));
}

function limpiarCampos() {
    document.getElementById('matricula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('correo').value = '';
}

function actualizarTabla() {
    fetch('http://127.0.0.1:5000/alumnos/todos')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tablaAlumnos').getElementsByTagName('tbody')[0];
            tabla.innerHTML = '';
            data.forEach(alumno => {
                const fila = tabla.insertRow();
                fila.insertCell(0).textContent = alumno[1]; // Matricula
                fila.insertCell(1).textContent = alumno[2]; // Nombre
                fila.insertCell(2).textContent = alumno[3]; // Telefono
                fila.insertCell(3).textContent = alumno[4]; // Correo
            });
        });
}

function EditarAlumno(){ 
        const matricula = document.getElementById('matricula').value;
    
        // Buscar el alumno en el array por su matrícula
        const alumno = listaAlumnos.find(alumno => alumno.matricula === matricula);
    
        if (alumno) {
            // Habilitar los campos de entrada para editar
            document.getElementById('nombre').disabled = false;
            document.getElementById('numero').disabled = false;
            document.getElementById('correo').disabled = false;
    
            // Deshabilitar el campo de matrícula para evitar cambios
            document.getElementById('matricula').disabled = true;
    
            // Habilitar los botones "Guardar" y "Cancelar"
            document.querySelector('button[onclick="GuardarAlumno()"]').disabled = false;
            document.querySelector('button[onclick="Cancelar()"]').disabled = false;
    
            // Deshabilitar los botones "Nuevo", "Editar", "Eliminar" y "Consultar"
            document.querySelector('button[onclick="NuevoAlumno()"]').disabled = true;
            document.querySelector('button[onclick="EditarAlumno()"]').disabled = true;
            document.querySelector('button[onclick="EliminarAlumno()"]').disabled = true;
            document.querySelector('button[onclick="consultarAlumno()"]').disabled = true;
    
            // Rellenar los campos con la información del alumno encontrado
            document.getElementById('nombre').value = alumno.nombre;
            document.getElementById('numero').value = alumno.numero;
            document.getElementById('correo').value = alumno.correo;
    
            // Actualizar el array al guardar los cambios
            document.querySelector('button[onclick="GuardarAlumno()"]').onclick = function () {
                alumno.nombre = document.getElementById('nombre').value;
                alumno.numero = document.getElementById('numero').value;
                alumno.correo = document.getElementById('correo').value;
    
                // Actualizar la tabla con los cambios
                actualizarTabla();
    
                // Limpiar los campos y restablecer botones
                limpiarCampos();
                document.querySelector('button[onclick="NuevoAlumno()"]').disabled = false;
                document.querySelector('button[onclick="EditarAlumno()"]').disabled = false;
                document.querySelector('button[onclick="EliminarAlumno()"]').disabled = false;
                document.querySelector('button[onclick="consultarAlumno()"]').disabled = false;
                document.querySelector('button[onclick="GuardarAlumno()"]').disabled = true;
                document.querySelector('button[onclick="Cancelar()"]').disabled = true;
            };
        } else {
            alert('Alumno no encontrado');
        }
    }


function ConsularAlumno(){
    // Deshabilitar los campos de entrada
    document.getElementById('matricula').disabled = true;
    document.getElementById('nombre').disabled = true;
    document.getElementById('numero').disabled = true;
    document.getElementById('correo').disabled = true;

    // Habilitar los botones "Nuevo", "Editar", "Eliminar" y "Consultar"
    document.querySelector('button[onclick="NuevoAlumno()"]').disabled = false;
    document.querySelector('button[onclick="EditarAlumno()"]').disabled = false;
    document.querySelector('button[onclick="EliminarAlumno()"]').disabled = false;
    document.querySelector('button[onclick="consultarAlumno()"]').disabled = false;

    // Deshabilitar los botones "Guardar" y "Cancelar"
    document.querySelector('button[onclick="GuardarAlumno()"]').disabled = true;
    document.querySelector('button[onclick="Cancelar()"]').disabled = true;
    
}
function NuevoAlumno() {
    // Habilitar los campos de entrada
    document.getElementById('matricula').disabled = false;
    document.getElementById('nombre').disabled = false;
    document.getElementById('numero').disabled = false;
    document.getElementById('correo').disabled = false;

    // Limpiar los campos de entrada
    limpiarCampos();

    // Habilitar el botón "Guardar" y "Cancelar"
    document.querySelector('button[onclick="GuardarAlumno()"]').disabled = false;
    document.querySelector('button[onclick="Cancelar()"]').disabled = false;

    // Deshabilitar los botones "Nuevo", "Editar", "Eliminar" y "Consultar"
    document.querySelector('button[onclick="NuevoAlumno()"]').disabled = true;
    document.querySelector('button[onclick="EditarAlumno()"]').disabled = true;
    document.querySelector('button[onclick="EliminarAlumno()"]').disabled = true;
    document.querySelector('button[onclick="consultarAlumno()"]').disabled = true;
}
function EliminarAlumno() {
    const matricula = document.getElementById('matricula').value;
    fetch(`http://127.0.0.1:5000/alumnos/eliminar?matricula=${matricula}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Alumno eliminado correctamente');
        actualizarTabla();
        limpiarCampos();
    })
    .catch(error => alert('Error al eliminar: ' + error));
}

function Cancelar() {
    // Limpiar los campos de entrada
    limpiarCampos();



    // Habilitar los botones "Nuevo", "Editar", "Eliminar" y "Consultar"
    document.querySelector('button[onclick="NuevoAlumno()"]').disabled = false;
    document.querySelector('button[onclick="EditarAlumno()"]').disabled = false;
    document.querySelector('button[onclick="EliminarAlumno()"]').disabled = false;
    document.querySelector('button[onclick="consultarAlumno()"]').disabled = false;

    // Deshabilitar los botones "Guardar" y "Cancelar"
    document.querySelector('button[onclick="GuardarAlumno()"]').disabled = true;
    document.querySelector('button[onclick="Cancelar()"]').disabled = true;
}

// Llama a actualizarTabla al cargar la página
window.onload = actualizarTabla;