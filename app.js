// ==========================
// VARIABLES DE INICIO
// ==========================

// Almacena el número secreto anterior para evitar que se repita
let ultimoNumeroSecreto = 0;

// Genera el primer número secreto entre 1 y 10
let numeroSecreto = generarNumeroRandom(10);

// Contador de intentos del jugador
let intentos = 1;

// Número máximo de intentos permitidos
let intentosMax = 5;

// ==========================
// MENSAJES DE INICIO
// ==========================

// Asigna el título del juego al elemento con id "titulo1"
asignarTexto('titulo1', 'Juego de numero secreto');

// Muestra mensaje inicial en el párrafo
asignarTexto('parrafo1', 'Ingrese un numero entre el 1 y 10.');

// ==========================
// FUNCIONES UTILITARIAS
// ==========================

// Asigna texto al elemento HTML con el id proporcionado
function asignarTexto(id, texto)
{
    document.getElementById(id).innerHTML = texto;
    return;
}

// Limpia el contenido del input con el id proporcionado
function limpiarCaja(id)
{
    document.getElementById(id).value = '';
    return;
}

// Genera un número aleatorio entre 1 y "limiteMax"
// Asegura que no sea igual al número secreto anterior
function generarNumeroRandom(limiteMax)
{
    let numeroRandom = Math.floor(Math.random() * limiteMax) + 1;
    
    // Si el número generado es igual al anterior, vuelve a generar 
    if(numeroRandom == ultimoNumeroSecreto)
    {
        return generarNumeroRandom(limiteMax);
    }

    return numeroRandom;
}

// Reinicia el juego a su estado inicial
function condicionesIniciales()
{
    // Guarda el número anterior para evitar repetición
    ultimoNumeroSecreto = numeroSecreto;
    
    // Genera nuevo número secreto
    numeroSecreto = generarNumeroRandom(10);
    
    // Reinicia el contador de intentos
    intentos = 1;

    // Vuelve a mostrar el mensaje inicial
    asignarTexto('parrafo1', 'Ingrese un numero entre el 1 y 10.');

    return;
}

// Habilita o deshabilita los botones del juego y el campo de entrada
function cambiarEstadoBotones(reiniciar, intentar, input)
{
    document.getElementById('botonReiniciar').disabled = reiniciar;
    document.getElementById('botonIntentar').disabled = intentar;
    document.getElementById('numeroUsuario').disabled = input;
}

// ==========================
// FUNCIONES PRINCIPALES DEL JUEGO
// ==========================

// Función que se ejecuta al hacer clic en el botón "Intentar"
function clicIntentar()
{
    // Obtiene el número ingresado por el usuario y lo convierte a entero
    let numeroUsuario = parseInt(document.getElementById('numeroUsuario').value);

    // Si el número es correcto
    if(numeroUsuario == numeroSecreto)
    {
        // Habilita botón "Reiniciar", deshabilita "Intentar"
        cambiarEstadoBotones(false, true, true);

        // Limpia el input
        limpiarCaja('numeroUsuario');
        
        // Muestra mensaje de éxito con los intentos realizados
        asignarTexto('parrafo1', `Acertaste, el numero secreto era ${numeroSecreto}. ${intentos == 1
                ? '¡Lo hiciste a la primera!'
                : 'Lo hiciste en ' + intentos + ' intentos.'}`);
    }

    else
    {
        // Incrementa el número de intentos
        intentos++;

        // Limpia el input
        limpiarCaja('numeroUsuario');

        // Indica si el número secreto es mayor o menor al ingresado
        if(numeroSecreto > numeroUsuario)
        {
            asignarTexto('parrafo1', '¡Mal! El numero es mayor.');
        }

        else
        {
            asignarTexto('parrafo1', '¡Mal! El numero es menor.');
        }
    }

    // Si se supera el número máximo de intentos
    if(intentos > intentosMax)
    {
        // Fin del juego
        cambiarEstadoBotones(false, true, true);
        limpiarCaja('numeroUsuario');
        asignarTexto('parrafo1', 'Intentos agotados. Juego terminado.');
    }

    return;
}

// Función que se ejecuta al hacer clic en el botón "Reiniciar"
function clicReiniciar()
{
    // Activa "Intentar" e input, desactiva "Reiniciar"
    cambiarEstadoBotones(true, false, false);

    // Reinicia variables y número secreto
    condicionesIniciales();
}