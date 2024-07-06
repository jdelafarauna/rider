var der = document.querySelector('.der');
var izq = document.querySelector('.izq');

// Función para mover el carrusel hacia la derecha
function moveRight() {
    let carousel = document.querySelector('.carousel');
    let items = document.querySelectorAll('.item');
    let firstItem = items[0];
    carousel.removeChild(firstItem);
    carousel.appendChild(firstItem);
}

// Función para mover el carrusel hacia la izquierda
function moveLeft() {
    let carousel = document.querySelector('.carousel');
    let items = document.querySelectorAll('.item');
    let lastItem = items[items.length - 1];
    carousel.removeChild(lastItem);
    carousel.insertBefore(lastItem, items[0]);
}

// Asignar evento click al botón de mover a la derecha
der.addEventListener('click', moveRight);

// Asignar evento click al botón de mover a la izquierda
izq.addEventListener('click', moveLeft);

// Obtener los elementos del carrusel
const items = document.querySelectorAll('.carousel .item');

// Realizar la petición fetch para obtener los datos y actualizar los elementos del carrusel
fetch('https://riderrank.onrender.com/apiConcurso/datos')
    .then(response => response.json())
    .then(data => {
        // Ordenar los datos por fecha del evento (ascendente)
        data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        
        // Actualizar el contenido de los elementos del carrusel
        data.forEach((evento, index) => {
            const item = items[index]; // Obtener el elemento correspondiente del carrusel

            // Actualizar el contenido de nombre y fecha
            const nombre = item.querySelector('.nombre');
            nombre.textContent = evento.organica;

            const info = item.querySelector('.info');
            info.textContent = `Fecha del evento: ${evento.fecha}`;

            // Crear el enlace para el botón "Mas Información"
            const boton = item.querySelector('.boton');
            boton.href = `https://riderrank.onrender.com/Clasificacion?id=${evento.id}`; // Establecer el enlace con el ID del evento
        });
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });