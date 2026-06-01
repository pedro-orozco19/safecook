const API = 'http://localhost:3000/api/auth';

function login() {
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword').value.trim();
    const btn = document.getElementById('btnLogin');

    btn.disabled = true;
    btn.innerHTML = 'CARGANDO... <i class="fa-solid fa-spinner fa-spin"></i>';

    fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.mensaje === 'Credenciales incorrectas' || data.error) {
            document.getElementById('alerta').innerText = data.mensaje || data.error;
            btn.disabled = false;
            btn.innerHTML = 'ENTRAR <i class="fa-solid fa-right-to-bracket"></i>';
            return;
        }
        
        if(data.token) {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('nombre', data.nombre);
            window.location.href = 'inicio.html';
        }
    })
    .catch(() => {
        document.getElementById('alerta').innerText = 'Error al conectar con el servidor.';
        btn.disabled = false;
        btn.innerHTML = 'ENTRAR <i class="fa-solid fa-right-to-bracket"></i>';
    });
}
