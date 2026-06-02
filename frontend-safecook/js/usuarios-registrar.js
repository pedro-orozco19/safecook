const API = 'http://localhost:3000/api/auth/registro'; 
const token = sessionStorage.getItem('token');
const nombreAdmin = sessionStorage.getItem('nombre');

if (!token) window.location.href = 'login.html';
document.getElementById('nombreUsuario').textContent = nombreAdmin || 'Usuario';

function guardarUsuario() {
    const nombre = document.getElementById('inputNombre').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value.trim();
    const btn = document.getElementById('btnGuardar');
    const alerta = document.getElementById('alerta');

    if (password.length < 6) {
        alerta.style.color = '#ef4444';
        alerta.innerText = 'La contraseña debe tener al menos 6 caracteres.';
        return;
    }

    btn.disabled = true;
    btn.innerHTML = 'Guardando... <i class="fa-solid fa-spinner fa-spin"></i>';

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error || data.mensaje === 'Este email ya está registrado') {
            alerta.style.color = '#ef4444';
            alerta.innerText = data.error || data.mensaje;
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-save"></i> Crear Usuario';
            return;
        }

        alerta.style.color = '#10b981';
        alerta.innerText = '¡Usuario creado con éxito!';
        
        setTimeout(() => { window.location.href = 'usuarios.html'; }, 1500);
    })
    .catch(() => {
        alerta.style.color = '#ef4444';
        alerta.innerText = 'Error al conectar con el servidor.';
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-save"></i> Crear Usuario';
    });
}

function cerrarSesion() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}
