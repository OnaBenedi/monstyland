const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciarJuego = document.getElementById("reiniciar-juego")
const botonPartner = document.getElementById("boton-partner")
const botonAscuas = document.getElementById("boton-ascuas")
const botonBurbujas = document.getElementById("boton-burbujas")
const botonTerremoto = document.getElementById("boton-terremoto")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarPartner = document.getElementById("seleccionar-partner")
const inputLilyleaf = document.getElementById("lilyleaf")
const inputMonstera = document.getElementById("monstera")
const inputBrakyton = document.getElementById("brakyton")
const spanPartnerJugador = document.getElementById("partner-jugador")

const spanPartnerEnemigo = document.getElementById("partner-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

let monstypals = []
let ataqueJugador 
let ataqueEnemigo
let resultadoCombate
let vidasJugador = 3
let vidasEnemigo = 3

class Monstypal {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let lilyleaf = new Monstypal('Lilyleaf', './assets/mokepons_mokepon_hipodoge_attack.webp', 5)

let monstera = new Monstypal('Monstera', './assets/mokepons_mokepon_capipepo_attack.webp', 5)

let brakyton = new Monstypal('Brakyton', './assets/mokepons_mokepon_ratigueya_attack.webp', 5)

lilyleaf.ataques.push(
    { nombre: '💧', id:'boton-burbujas' },
    { nombre: '💧', id:'boton-burbujas'},
    { nombre: '💧', id:'boton-burbujas' },
    { nombre: '🔥', id:'boton-ascuas'},
    { nombre: '🍃', id:'boton-terremoto'},
)

monstera.ataques.push(
    { nombre: '🍃', id:'boton-terremoto'},
    { nombre: '🍃', id:'boton-terremoto'},
    { nombre: '🍃', id:'boton-terremoto'},
    { nombre: '💧', id:'boton-burbujas' },
    { nombre: '🔥', id:'boton-ascuas'}
)

brakyton.ataques.push(
    { nombre: '🔥', id:'boton-ascuas'},
    { nombre: '🔥', id:'boton-ascuas'},
    { nombre: '🔥', id:'boton-ascuas'},
    { nombre: '🍃', id:'boton-terremoto'},
    { nombre: '💧', id:'boton-burbujas' }
)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciarJuego.style.display = "none"

    botonPartner.addEventListener("click", seleccionarPartnerJugador)

    botonAscuas.addEventListener("click", ataqueAscuas)
    botonBurbujas.addEventListener("click", ataqueBurbujas)
    botonTerremoto.addEventListener("click", ataqueTerremoto)

    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarPartnerJugador(){
    sectionSeleccionarAtaque.style.display = "flex"
    sectionSeleccionarPartner.style.display = "none"

//   let inputLangostelvis = document.getElementById("langostelvis")
//    let inputTucapalma = document.getElementById("tucapalma")
//    let inputPydos = document.getElementById("Pydos")
    
    if (inputLilyleaf.checked) {
        spanPartnerJugador.innerHTML = "Lilyleaf"
    } else if (inputMonstera.checked) {
        spanPartnerJugador.innerHTML = "Monstera"
    } else if (inputBrakyton.checked) {
        spanPartnerJugador.innerHTML = "Brakyton"
    } else {
        alert("Selecciona tu mascota")
    }

seleccionarPartnerEnemigo()

botonPartner.disabled = true
}

function seleccionarPartnerEnemigo() {
    let partnerAleatorio = aleatorio(1,3)
    if (partnerAleatorio == 1) {
        spanPartnerEnemigo.innerHTML = "Lilyleaf"
    } else if (partnerAleatorio == 2) {
        spanPartnerEnemigo.innerHTML = "Monstera"
    } else {
        spanPartnerEnemigo.innerHTML = "Brakyton"
    }
}

function ataqueAscuas(){
    ataqueJugador = "ASCUAS"
    ataqueAleatorioEnemigo()
}

function ataqueBurbujas() {
    ataqueJugador = "BURBUJAS"
    ataqueAleatorioEnemigo()
}

function ataqueTerremoto() {
    ataqueJugador = "TERREMOTO"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "ASCUAS"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "BURBUJAS"
    } else {
        ataqueEnemigo = "TERREMOTO"
    }
    combate()
}

function combate() {
    //1 = fuego, 2 = agua, 3 = planta
    if(ataqueJugador == ataqueEnemigo) {
        resultadoCombate = "Empate"
    } else if(ataqueJugador == "ASCUAS" && ataqueEnemigo == "TERREMOTO") {
        resultadoCombate = "Victoria"
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == "BURBUJAS" && ataqueEnemigo == "ASCUAS") {
        resultadoCombate = "Victoria"
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == "TERREMOTO" && ataqueEnemigo == "BURBUJAS") {
        resultadoCombate = "Victoria"
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        resultadoCombate = "Derrota"
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    crearMensaje()

    revisarVidas()

}

function revisarVidas(){
    if (vidasEnemigo == 0) {
        crearMensajeFinal("Felicidades, ganaste el combate!🎉🏆")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Mala suerte, perdiste el combate.")
    } 
}

function crearMensaje() {
    let nuevoAtaqueDelJugador = document.createElement("p")
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador

    let nuevoAtaqueDelEnemigo = document.createElement("p")
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    sectionMensajes.innerHTML = resultadoCombate


   // sectionMensajes.appendChild(notificacion)
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    //sectionMensajes.appendChild(parrafo)

    botonAscuas.disabled = true

    botonBurbujas.disabled = true
    
    botonTerremoto.disabled = true

    sectionReiniciarJuego.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max) {
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

window.addEventListener("load", iniciarJuego)