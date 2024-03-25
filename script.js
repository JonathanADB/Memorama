// Asignar la función generarTablero al evento onload para que se ejecute automáticamente al cargar la página
window.onload = generarTablero;

let selecciones = [];
let cantidadTarjetas = 12; // Número total de cartas en el juego
let iconos = [];

// Función para cargar los iconos en el array
function cargarIconos() {
    iconos = [
        '🇨🇺', '🇨🇺',
        '🇮🇨', '🇮🇨',
        '🇨🇴', '🇨🇴',
        '🇦🇷', '🇦🇷',
        '🇪🇸', '🇪🇸',
        '🇽🇰', '🇽🇰',
        '🇦🇩', '🇦🇩',
        '🇦🇪', '🇦🇪',
        '🇧🇴', '🇧🇴',
        '🇨🇨', '🇨🇨',
        '🇨🇱', '🇨🇱',
        '🇵🇱', '🇵🇱'
    ];
}

// Función para generar el tablero de juego
function generarTablero() {
    cargarIconos(); // Llamar a la función para cargar los iconos
    let tablero = document.getElementById("tablero");
    tablero.innerHTML = '';

    for (let i = 0; i < cantidadTarjetas * 2; i++) {
        let nuevaCarta = document.createElement('div');
        nuevaCarta.classList.add('area-carta');
        nuevaCarta.addEventListener('click', () => seleccionarTarjeta(i));

        let randomIndex = Math.floor(Math.random() * iconos.length);
        let icono = iconos.splice(randomIndex, 1)[0];

        nuevaCarta.innerHTML = `
            <div class="carta" id="tarjeta${i}">
                <div class="cara frontal">
                    ❔
                </div>
                <div class="cara trasera oculto">
                    ${icono}
                </div>
            </div>`;
        tablero.appendChild(nuevaCarta);
    }
}

// Función para seleccionar una tarjeta
function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i);
    if (!tarjeta.classList.contains('seleccionada') && selecciones.length < 2) {
        tarjeta.classList.add('seleccionada');
        tarjeta.style.transform = "rotateY(180deg)"; // Girar la carta al ser seleccionada

        // Mostrar la cara trasera de la carta seleccionada
        tarjeta.querySelector('.cara.trasera').classList.remove('oculto');

        selecciones.push(i);
    }

    if (selecciones.length == 2) {
        setTimeout(() => {
            deseleccionar(selecciones);
            selecciones = [];
        }, 1000);
    }
}

// Función para deseleccionar tarjetas
function deseleccionar(selecciones) {
    let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
    let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);

    if (tarjeta1.querySelector('.trasera').innerHTML !== tarjeta2.querySelector('.trasera').innerHTML) {
        tarjeta1.classList.remove('seleccionada');
        tarjeta2.classList.remove('seleccionada');
        tarjeta1.style.transform = "rotateY(0deg)"; // Girar la carta de vuelta
        tarjeta2.style.transform = "rotateY(0deg)"; // Girar la carta de vuelta

        // Ocultar la cara trasera de las cartas deseleccionadas
        tarjeta1.querySelector('.cara.trasera').classList.add('oculto');
        tarjeta2.querySelector('.cara.trasera').classList.add('oculto');
    } else {
        // Cambiar el color de fondo de las cartas emparejadas
        tarjeta1.querySelector('.trasera').style.background = "plum";
        tarjeta2.querySelector('.trasera').style.background = "plum";
    }

    if (verificarFin()) {
        alert("¡El juego ha finalizado! Felicitaciones");
    }
}

// Función para verificar si el juego ha finalizado
function verificarFin() {
    let cartas = document.querySelectorAll('.carta');
    for (let i = 0; i < cartas.length; i++) {
        if (!cartas[i].querySelector('.trasera').style.background) {
            return false;
        }
    }
    return true;
}


// Agregar el evento click al botón "Nuevo Juego"
const generarTableroBoton = document.querySelector(".nuevo-juego");
generarTableroBoton.addEventListener("click", generarTablero);
