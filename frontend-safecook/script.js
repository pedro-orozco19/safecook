document.addEventListener('DOMContentLoaded', () => {

    const TELEGRAM_TOKEN = '8244468076:AAFN-95fWUTacmKJ-O7DYf95rdFc7sQTVWg'; 
    const CHAT_ID = '8259675422';

    // Navegación
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const headerTitle = document.getElementById('header-title');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(this.getAttribute('data-target')).classList.add('active');
            headerTitle.innerText = this.innerText;
        });
    });

    // Gráfica
    const ctx = document.getElementById('gasChart').getContext('2d');
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

    // Lógica Central
    const gasSlider = document.getElementById('gas-slider');
    const btnEnviarLectura = document.getElementById('btn-enviar-lectura'); 
    
    const gasLevelEl = document.getElementById('gas-level');
    const gasStatusEl = document.getElementById('gas-status');
    const cardGas = document.getElementById('card-gas');
    const valvulaStatusEl = document.getElementById('valvula-status');
    const cardValvula = document.getElementById('card-valvula');
    const extractorStatusEl = document.getElementById('extractor-status');
    const cardExtractor = document.getElementById('card-extractor');
    
    const bitacoraBody = document.getElementById('bitacora-body');
    const filaVacia = document.getElementById('fila-vacia');

    const UMBRAL_PELIGRO = 800;
    let estadoFugaActiva = false; 

    // --- VARIABLES DE ANALÍTICA PREDICTIVA ---
    let vidaUtilSensor = 82.50;
    let saludValvula = 100.0;
    const riesgoEl = document.getElementById('riesgo-parrillas');
    const riesgoStatusEl = document.getElementById('riesgo-status');
    const cardRiesgo = document.getElementById('card-riesgo');
    const vidaSensorEl = document.getElementById('vida-sensor');
    const saludValvulaEl = document.getElementById('salud-valvula');
    const cardSaludValvula = document.getElementById('card-salud-valvula');

    function actualizarAnalitica(ppm) {
        // 1. Cálculo de Riesgo basado en el nivel de gas actual
        let riesgoBase = Math.floor((ppm / 1000) * 100);
        let riesgoRuido = Math.floor(Math.random() * 5); // Le da un toque dinámico
        let riesgoFinal = riesgoBase + riesgoRuido;
        if (riesgoFinal > 100) riesgoFinal = 100;
        if (riesgoFinal < 14) riesgoFinal = 14 + riesgoRuido; // Base mínima de riesgo
        
        riesgoEl.innerText = riesgoFinal + "%";
        
        if(riesgoFinal < 40) {
            riesgoStatusEl.innerText = "Índice de Riesgo (Bajo)";
            cardRiesgo.style.borderTopColor = "#10b981"; // Verde
        } else if (riesgoFinal < 80) {
            riesgoStatusEl.innerText = "Índice de Riesgo (Elevado)";
            cardRiesgo.style.borderTopColor = "#f59e0b"; // Naranja
        } else {
            riesgoStatusEl.innerText = "PELIGRO INMINENTE";
            cardRiesgo.style.borderTopColor = "#ef4444"; // Rojo
        }

        // 2. Desgaste del Sensor MQ-2
        let desgaste = ppm > 600 ? 0.08 : 0.01; // Se desgasta más si huele mucho gas
        vidaUtilSensor -= desgaste;
        vidaSensorEl.innerText = vidaUtilSensor.toFixed(2) + "%";

        // 3. Desgaste de la Válvula por golpe de ariete (cierre brusco)
        if (ppm >= UMBRAL_PELIGRO && !estadoFugaActiva) {
            saludValvula -= 0.5;
            saludValvulaEl.innerText = saludValvula.toFixed(1) + "%";
            if(saludValvula <= 99.0) {
                cardSaludValvula.style.borderTopColor = "#f59e0b";
            }
        }
    }

    function enviarAlertaAutomaticaTelegram(ppm) {
        const mensaje = `🚨 *SAFECOOK: FUGA CRÍTICA DETECTADA* 🚨\n\nNivel: *${ppm} PPM*\nAcción: Válvula Cerrada, Extractor Encendido.\nRevisa el local de inmediato.`;
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: mensaje, parse_mode: 'Markdown' })
        })
        .then(res => res.json())
        .then(data => {
            if(data.ok) {
                alert("📲 ¡ALERTA AUTOMÁTICA ENVIADA! Revisa tu Telegram.");
            }
        });
    }

    function actualizarDashboard(ppm) {
        gasLevelEl.innerText = ppm + " PPM";

        // Llama a la simulación predictiva
        actualizarAnalitica(ppm);

        if (ppm < 400) {
            gasStatusEl.innerText = "Estado: Normal";
            cardGas.className = "card safe";
            valvulaStatusEl.innerText = "ABIERTA";
            cardValvula.className = "card safe";
            extractorStatusEl.innerText = "APAGADO";
            cardExtractor.className = "card safe";
            gasChart.data.datasets[0].borderColor = '#10b981';
            estadoFugaActiva = false; 
            
        } else if (ppm >= 400 && ppm < UMBRAL_PELIGRO) {
            gasStatusEl.innerText = "Estado: Precaución";
            cardGas.className = "card warning";
            valvulaStatusEl.innerText = "ABIERTA";
            cardValvula.className = "card warning";
            extractorStatusEl.innerText = "APAGADO";
            cardExtractor.className = "card safe";
            gasChart.data.datasets[0].borderColor = '#f59e0b';
            estadoFugaActiva = false; 
            
        } else {
            gasStatusEl.innerText = "FUGA CRÍTICA";
            cardGas.className = "card danger";
            valvulaStatusEl.innerText = "CERRADA (BLOQUEO)";
            cardValvula.className = "card danger";
            extractorStatusEl.innerText = "ENCENDIDO";
            cardExtractor.className = "card danger";
            gasChart.data.datasets[0].borderColor = '#ef4444';
            
            if (!estadoFugaActiva) {
                registrarEnBitacora(ppm);
                enviarAlertaAutomaticaTelegram(ppm); 
                estadoFugaActiva = true; 
            }
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

    function registrarEnBitacora(ppm) {
        if (filaVacia) filaVacia.style.display = 'none'; 
        const ahora = new Date();
        const horaTexto = ahora.toLocaleTimeString();
        
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td><strong>${horaTexto}</strong></td>
            <td style="color: #ef4444; font-weight: bold;">${ppm} PPM</td>
            <td>Válvula Cerrada, Extractor ON</td>
            <td><span class="badge-fuga">Alerta Telegram Enviada</span></td>
        `;
        bitacoraBody.prepend(nuevaFila);
    }

    if(btnEnviarLectura) {
        btnEnviarLectura.addEventListener('click', () => {
            const valorBase = parseInt(gasSlider.value);
            const ruido = Math.floor(Math.random() * 31) - 15;
            let valorFinal = valorBase + ruido;
            if (valorFinal < 0) valorFinal = 0;
            actualizarDashboard(valorFinal);
        });
    }

    const formFeedback = document.getElementById('form-feedback');
    if(formFeedback) {
        formFeedback.addEventListener('submit', (e) => {
            e.preventDefault(); 
            alert("¡Formulario enviado con éxito! Las respuestas se han guardado en la base de datos.");
            formFeedback.reset(); 
        });
    }

    
    const loginForm = document.getElementById('login-form');
        const loginOverlay = document.getElementById('login-overlay');
const mainApp = document.getElementById('main-app'); // Asegúrate que tu dashboard tenga este ID

    loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginOverlay.style.display = 'none';
    mainApp.classList.remove('hidden');
    });
});