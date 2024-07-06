document.addEventListener("DOMContentLoaded", function() {
    // URL del endpoint del controlador
    const url = "https://riderrank.onrender.com/apiCompetidor/clasiGlobal"; // Asegúrate de proporcionar la URL correcta
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("La solicitud no pudo ser completada.");
        }
        return response.json();
      })
      .then(data => {
        // Obtener la referencia a la tabla
        const tabla = document.getElementById("tabla-clasificacion");
  
        // Limpiar cualquier fila existente en la tabla
        tabla.getElementsByTagName("tbody")[0].innerHTML = "";
  
        // Iterar sobre los datos y agregar filas a la tabla
        data.forEach(competidor => {
          const fila = `<tr>
                         <td>${competidor.nombre}</td>
                         <td>${competidor.caballo}</td>
                         <td>${competidor.derribos}</td>
                         <td>${competidor.desobediencias}</td>
                         <td>${competidor.eliminado ? 'Sí' : 'No'}</td>
                         <td>${competidor.caido ? 'Sí' : 'No'}</td>
                         <td>${competidor.tiempo}</td>
                         <td>${competidor.observaciones}</td>
                         <td>${competidor.puntos}</td>
                       </tr>`;
          tabla.getElementsByTagName("tbody")[0].insertAdjacentHTML("beforeend", fila);
        });
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  });
  