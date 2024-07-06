// cronometro.js

var cronometro;
var milisegundos = 0, segundos = 0;
var display = document.getElementById("cronometro");

function iniciarCronometro() {
    cronometro = setInterval(function() {
        milisegundos++;
        if (milisegundos === 100) {
            milisegundos = 0;
            segundos++;
        }
        display.innerHTML = (segundos < 10 ? "0" + segundos : segundos) + ":" + 
                             (milisegundos < 10 ? "0" + milisegundos : milisegundos);
    }, 10); // Actualiza cada 10 milisegundos
}

function pausarCronometro() {
    clearInterval(cronometro);
}

function reiniciarCronometro() {
    clearInterval(cronometro);
    milisegundos = 0;
    segundos = 0;
    display.innerHTML = "00:00";
}
