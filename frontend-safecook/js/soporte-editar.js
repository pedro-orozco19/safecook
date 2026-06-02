const API = 'http://localhost:3000/api/soporte';
const token = sessionStorage.getItem('token');
const nombre = sessionStorage.getItem('nombre');

// Extraer el ID de la URL (ej. soporte-editar.html?id=3)
const parametrosURL = new URLSearchParams(window.location.search);
const idRegistro = parametrosURL.get('id');

if (!token) {
    window.location.href = 'login.html';
}

document.getElementById('nombreUsuario').textContent = nombre || 'Usuario';

// 1. Cargar los datos actuales del registro para llenar el formulario
function cargarDatos() {
    if (!idRegistro) return;

    fetch(`${API}/${idRegistro}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        // Manejamos si el backend devuelve un arreglo o un objeto directo
        const registro = Array.isArray(data) ? data[0] : data;
        
        if (registro) {
            document.getElementById('inputOperador').value = registro.nombre_operador;
            document.getElementById('inputTipo').value = registro.tipo_reporte;
            document.getElementById('inputExperiencia').value = registro.experiencia;
            document.getElementById('inputCalificacion').value = registro.calificacion;
        }
    })
    .catch(err => console.error("Error al cargar los datos del registro", err));
}

// 2. Guardar los cambios (Hacer el PUT)
function actualizarRegistro() {
    const nombre_operador = document.getElementById('inputOperador').value.trim();
    const tipo_reporte = document.getElementById('inputTipo').value;
    const experiencia = document.getElementById('inputExperiencia').value.trim();
    const calificacion = document.getElementById('inputCalificacion').value;
    
    const btn = document.getElementById('btnGuardar');
    const alerta = document.getElementById('alerta');

    btn.disabled = true;
    btn.innerHTML = 'Actualizando... <i class="fa-solid fa-spinner fa-spin"></i>';

    fetch(`${API}/${idRegistro}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre_operador, tipo_reporte, experiencia, calificacion })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alerta.style.color = '#ef4444';
            alerta.innerText = 'Error: ' + data.error;
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-save"></i> Guardar Cambios';
            return;
        }

        alerta.style.color = '#10b981';
        alerta.innerText = '¡Registro actualizado con éxito!';
        
        setTimeout(() => {
            window.location.href = 'soporte.html';
        }, 1500);
    })
    .catch(err => {
        alerta.style.color = '#ef4444';
        alerta.innerText = 'Error al conectar con el servidor.';
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-save"></i> Guardar Cambios';
    });
}

function cerrarSesion() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

cargarDatos();