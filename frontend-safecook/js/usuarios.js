
const API = 'http://localhost:3000/api/usuarios'; 
const token = sessionStorage.getItem('token');
const nombre = sessionStorage.getItem('nombre');

if (!token) {
    window.location.href = 'login.html';
}

document.getElementById('nombreUsuario').textContent = nombre || 'Usuario';

function cargarTabla() {
    fetch(API, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401) {
            sessionStorage.clear();
            window.location.href = 'login.html';
        }
        return res.json();
    })
    .then(data => {
        const cuerpo = document.getElementById('cuerpoTabla');
        cuerpo.innerHTML = '';

        if(data.length === 0) {
            cuerpo.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay usuarios registrados.</td></tr>';
            return;
        }

        data.forEach(item => {
            cuerpo.innerHTML += `
                <tr class="fila-registro">
                    <td>${item.id}</td>
                    <td class="buscable" style="font-weight: 600;">${item.nombre}</td>
                    <td class="buscable">${item.email}</td>
                    <td>
                        <button class="btn-editar" onclick="editarRegistro(${item.id})"><i class="fa-solid fa-pen"></i></button>
                        <button class="btn-eliminar" onclick="eliminarRegistro(${item.id})"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
    })
    .catch(err => console.error("Error al cargar usuarios:", err));
}

function eliminarRegistro(id) {
    if (confirm('¿Estás seguro de que deseas eliminar a este usuario del sistema?')) {
        fetch(`${API}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('alerta').innerText = "Usuario eliminado correctamente.";
            document.getElementById('alerta').style.color = "#10b981";
            cargarTabla(); // Recargar la tabla
        })
        .catch(err => console.error("Error al eliminar:", err));
    }
}

function filtrarTabla() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const filas = document.querySelectorAll('.fila-registro');

    filas.forEach(fila => {
        const contenido = fila.innerText.toLowerCase();
        if (contenido.includes(texto)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

function editarRegistro(id) {
    window.location.href = `usuarios-editar.html?id=${id}`;
}

function cerrarSesion() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// Inicializar
cargarTabla();