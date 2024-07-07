 // Función para obtener el parámetro de la URL
 function obtenerParametroURL() {
    var url = window.location.href;
    console.log(url);
    var urlObj = new URL(url);
    return urlObj.searchParams.get("id");
}

// ID proporcionado en la URL
var idSeleccionado = obtenerParametroURL();
console.log(idSeleccionado);

// URL del endpoint
var urlEndpoint = 'https://riderrank.onrender.com/apiReserva/datos';

// Realizar la solicitud GET
fetch(urlEndpoint)
    .then(response => response.json())
    .then(data => {
        // Insertar los datos en la tabla
        var tbody = document.getElementById('datos');
        data.forEach(function(dato) {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${dato.organica}</td>
                <td>${dato.concurso}</td>
                <td>${dato.ambito}</td>
                <td>${dato.fecha}</td>
                <td>${dato.prueba}</td>
            `;
            tbody.appendChild(row);
            // Resaltar la fila si coincide con el ID proporcionado
            if (dato.id == idSeleccionado) {
                row.classList.add('resaltado');
            }
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));

    document.addEventListener('DOMContentLoaded', function() {
        var fechaActual = new Date().toISOString().split('T')[0];
    
        var inputFecha = document.getElementById('fecha');
    
        inputFecha.min = fechaActual;
    });