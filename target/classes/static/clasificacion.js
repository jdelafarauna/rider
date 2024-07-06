var url = window.location.href;
console.log(url);
var urlObj = new URL(url);
var id = urlObj.searchParams.get("id");
console.log("id" + id);
if (id !== null) {
    console.log("El ID obtenido de la URL es:", id);
} else {
    console.error("El ID no está definido en la URL.");
}
var urlD = `https://riderrank.onrender.com/apiConcurso/${id}`;
console.log(urlD);
fetch(urlD)
    .then(response => response.json())
    .then(data => {
        // Insertar datos de la competición en la primera tabla
        const datosTable = document.getElementById('datos').getElementsByTagName('tbody')[0];
        const row = datosTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);
        const cell8 = row.insertCell(7);
        cell1.textContent = data.organica;
        cell2.textContent = data.concurso;
        cell3.textContent = data.ambito;
        cell4.textContent = data.tiempo;
        cell5.textContent = data.altura;
        cell6.textContent = data.numero;
        cell7.textContent = data.fecha;
        cell8.textContent = data.prueba;
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.response && error.response.status === 500) {
          console.error('Error interno del servidor');
          // Redirige a error.html
          window.location.href = 'error.html';
        } else {
          console.error('Error de red u otro tipo de error');
          // Realiza alguna acción para otros tipos de error
        }
    });

        // Insertar datos de los competidores en la segunda tabla
        const competidoresTable = document.getElementById('competidores').getElementsByTagName('tbody')[0];
        fetch(`https://riderrank.onrender.com/apiCompetidor/Concurso/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ha ocurrido un error al obtener los datos de los competidores.');
        }
        return response.json();
    })
    .then(data => {
        const competidoresTable = document.getElementById('competidores').getElementsByTagName('tbody')[0];
        data.forEach(competidor => {
            const competidorRow = competidoresTable.insertRow();
            competidorRow.insertCell(0).textContent = competidor.nombre;
            competidorRow.insertCell(1).textContent = competidor.caballo;
            competidorRow.insertCell(2).textContent = competidor.derribos;
            competidorRow.insertCell(3).textContent = competidor.desobediencias;
            competidorRow.insertCell(4).textContent = competidor.eliminado;
            competidorRow.insertCell(5).textContent = competidor.caido;
            competidorRow.insertCell(6).textContent = competidor.tiempo;
            competidorRow.insertCell(7).textContent = competidor.observaciones;
            competidorRow.insertCell(8).textContent = competidor.puntos;

            // Crear el botón de eliminar y adjuntar el evento de click
            const deleteButtonCell = competidorRow.insertCell(9);
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = " <span>&#128465;</span>";
            deleteButton.classList.add("delete");
            deleteButton.addEventListener("click", function() {
                eliminarCompetidor(competidor.id); // Llamar a la función eliminarCompetidor con el ID del competidor
            });
            deleteButtonCell.appendChild(deleteButton);
            const editButton = document.createElement("button");
            editButton.innerHTML = "Editar";
            editButton.classList.add("edit");
            deleteButtonCell.appendChild(editButton);
            editButton.addEventListener("click", function() {
                editCont(competidor.id); // Llamar a la función eliminarCompetidor con el ID del competidor
            });
        });
    })
    .catch(error => console.error('Ha ocurrido un error:', error));


// Función para eliminar un competidor
function eliminarCompetidor(idCompetidor) {
    fetch(`https://riderrank.onrender.com/apiCompetidor/${idCompetidor}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Si la eliminación es exitosa, recargar la página para mostrar los cambios
            location.reload();
        } else {
            console.error('Error al eliminar el competidor.');
        }
    })
    .catch(error => console.error('Ha ocurrido un error:', error));
}

function editCont(idCont){
    if (!idCont) {
        console.error('El ID del mensaje es undefined.');
        return;
    }
    const queryParams = new URLSearchParams({ id: idCont }).toString();
    window.location.href = `editorP?${queryParams}`;
        
}



