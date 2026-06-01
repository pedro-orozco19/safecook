const API = 'http://localhost:3000/api/auth';

function registro() {
    const nombre = document.getElementById('inputNombre').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value.trim();
    const btn = document.getElementById('btnRegistro');
    const alerta = document.getElementById('alerta');

    if (password.length < 6) {
        alerta.style.color = '#ef4444';
        alerta.innerText = 'La contraseña debe tener al menos 6 caracteres.';
        return;
    }

    btn.disabled = true;
    btn.innerHTML = 'REGISTRANDO... <i class="fa-solid fa-spinner fa-spin"></i>';

    fetch(`${API}/registro`, {
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
            btn.innerHTML = 'REGISTRARME <i class="fa-solid fa-user-plus"></i>';
            return;
        }
        
        alerta.style.color = '#10b981';
        alerta.innerText = '¡Cuenta creada! Redirigiendo al login...';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    })
    .catch(() => {
        alerta.style.color = '#ef4444';
        alerta.innerText = 'Error al conectar con el servidor.';
        btn.disabled = false;
        btn.innerHTML = 'REGISTRARME <i class="fa-solid fa-user-plus"></i>';
    });
}