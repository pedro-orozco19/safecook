document.addEventListener('DOMContentLoaded', () => {

    const token = sessionStorage.getItem('token');
    const nombreAdmin = sessionStorage.getItem('nombre');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const nombreSpan = document.getElementById('nombreUsuario');
    if (nombreSpan) {
        nombreSpan.textContent = nombreAdmin || 'Administrador';
    }

    const ctx = document.getElementById('gasChart'); 
    if (!ctx) {
        console.error("No se encontró el canvas para la gráfica");
        return; 
    }

    const gasChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Nivel de Gas LP (PPM)',
                data: [],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#10b981',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 300 },
            scales: {
                y: { beginAtZero: true, max: 1000, title: { display: true, text: 'PPM' } },
                x: { title: { display: false } }
            }
        }
    });

    function inyectarDatos() {
        const slider = document.getElementById('gas-slider'); 
        const gasLevelEl = document.querySelector('.value') || document.getElementById('gas-level'); 

        if (!slider || !gasLevelEl) return;

        const valorBase = parseInt(slider.value);
        const ruido = Math.floor(Math.random() * 31) - 15; 
        let ppm = valorBase + ruido;

        if (ppm < 0) ppm = 0;

        gasLevelEl.innerText = ppm + " PPM";

        if (ppm < 400) {
            gasChart.data.datasets[0].borderColor = '#10b981'; // Verde (Seguro)
        } else if (ppm >= 400 && ppm < 800) {
            gasChart.data.datasets[0].borderColor = '#f59e0b'; // Naranja (Precaución)
        } else {
            gasChart.data.datasets[0].borderColor = '#ef4444'; // Rojo (Peligro)
        }
        const ahora = new Date();
        const horaTexto = ahora.toLocaleTimeString();

        gasChart.data.labels.push(horaTexto);
        gasChart.data.datasets[0].data.push(ppm);

        if (gasChart.data.labels.length > 15) {
            gasChart.data.labels.shift();
            gasChart.data.datasets[0].data.shift();
        }

        gasChart.update();
    }


    const btnInyectar = document.getElementById('btn-enviar-lectura') || document.querySelector('.action-btn');
    if (btnInyectar) {
        btnInyectar.addEventListener('click', () => {
            inyectarDatos();
            // Le damos un efectito visual al botón
            btnInyectar.style.transform = "scale(0.95)";
            setTimeout(() => btnInyectar.style.transform = "scale(1)", 150);
        });
    }
    setInterval(inyectarDatos, 10000);

    inyectarDatos();
});

function cerrarSesion() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}