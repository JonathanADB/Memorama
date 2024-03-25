const generarTablero = document.querySelector(".nuevo-juego")

let cantidadTarjetas = 24

let iconos = []
let selecciones = []

function cargarIconos () {
    iconos = [
        '🇨🇺',
        '🇮🇨',
        '🇨🇴',
        '🇦🇷',
        '🇪🇸',
        '🇯🇵',
        '🇽🇰',
        '🇦🇩',
        '🇦🇪',
        '🇧🇴',
        '🇨🇨',
        '🇨🇱',
        '🇵🇱'
    ]
}

generarTablero.addEventListener ("click", () => {
 
    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []

    // Limpiamos el tablero antes de agregar nuevas cartas
    tablero.innerHTML = '';
    
    for (let i = 0; i < cantidadTarjetas; i++) {
        let nuevaCarta = document.createElement('div');
        nuevaCarta.classList.add('area-carta');
        nuevaCarta.addEventListener('click', () => seleccionarTarjeta(i));
        
        nuevaCarta.innerHTML = `
            <div class="carta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    ❔
                </div>
            </div>`;
        
        tablero.appendChild(nuevaCarta);
        

        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
  
})



function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        } else {
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
        }
        if (verificarFin()) {
            swal.fire({
                title: `El juego ha finalizado`,
                text: `Felicitaciones`,
                icon: `success`
            })
        }
    }, 1000);
}

function verificarFin() {
    for (let i = 0; i < cantidadTarjetas; i++) {
        let trasera = document.getElementById("trasera" + i)
        if (trasera.style.background != "plum") {
            return false
        }
    }
    return true
}
