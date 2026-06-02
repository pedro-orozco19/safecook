const API = 'http://localhost:3000/api/usuarios';
const token = sessionStorage.getItem('token');
const nombreAdmin = sessionStorage.getItem('nombre');

const parametrosURL = new URLSearchParams(window.location.search);
const idRegistro = parametrosURL.get('id');

if (!token) window.location.href = 'login.html';
document.getElementById('nombreUsuario').textContent = nombreAdmin || 'Usuario';

function cargarDatos() {
    if (!idRegistro) return;

    fetch(`${API}/${idRegistro}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        const usuario = Array.isArray(data) ? data[0] : data;
        if (usuario) {
            document.getElementById('inputNombre').value = usuario.nombre;
            document.getElementById('inputEmail').value = usuario.email;
        }
    })
    .catch(err => console.error("Error al cargar datos", err));
}

function actualizarUsuario() {
    const nombre = document.getElementById('inputNombre').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
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
        body: JSON.stringify({ nombre, email })
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
        alerta.innerText = '¡Usuario actualizado con éxito!';
        
        setTimeout(() => { window.location.href = 'usuarios.html'; }, 1500);
    })
    .catch(() => {
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
