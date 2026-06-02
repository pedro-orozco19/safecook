const API = 'http://localhost:3000/api/soporte';
const token = sessionStorage.getItem('token');
const nombre = sessionStorage.getItem('nombre');

if (!token) {
    window.location.href = 'login.html';
}

document.getElementById('nombreUsuario').textContent = nombre || 'Usuario';

function guardarRegistro() {
    const nombre_operador = document.getElementById('inputOperador').value.trim();
    const tipo_reporte = document.getElementById('inputTipo').value;
    const experiencia = document.getElementById('inputExperiencia').value.trim();
    const calificacion = document.getElementById('inputCalificacion').value;
    
    const btn = document.getElementById('btnGuardar');
    const alerta = document.getElementById('alerta');

    btn.disabled = true;
    btn.innerHTML = 'Guardando... <i class="fa-solid fa-spinner fa-spin"></i>';

    fetch(API, {
        method: 'POST',
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
            btn.innerHTML = '<i class="fa-solid fa-save"></i> Guardar Reporte';
            return;
        }

        alerta.style.color = '#10b981';
        alerta.innerText = '¡Reporte guardado con éxito! Regresando a la lista...';
        
        setTimeout(() => {
            window.location.href = 'soporte.html';
        }, 1500);
    })
    .catch(err => {
        alerta.style.color = '#ef4444';
        alerta.innerText = 'Error al conectar con el servidor.';
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-save"></i> Guardar Reporte';
    });
}

function cerrarSesion() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}
