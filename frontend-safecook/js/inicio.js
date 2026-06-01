const API = 'http://localhost:3000/api';
const token = sessionStorage.getItem('token');
const nombre = sessionStorage.getItem('nombre');

if (!token) {
    window.location.href = 'login.html';
}


document.getElementById('nombreUsuario').textContent = nombre || 'Usuario';

fetch(`${API}/inicio`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(res => {
    // Si el token ya caducó
    if (res.status === 401) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
})
.catch(() => {
    console.error("Error validando el token en el servidor.");
});

function cerrarSesion() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}