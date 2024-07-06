let currentYear, currentMonth;
const concursosPorFecha = {};
const reservasPorFecha = {}; // Agregamos un objeto para almacenar las reservas por fecha

document.getElementById('prev-month-btn').addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

document.getElementById('next-month-btn').addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

function updateCalendar() {
    const nombreMes = obtenerNombreMes(currentMonth);
    document.querySelector('#content h1').textContent = `${nombreMes} ${currentYear}`;
    createCalendar(currentYear, currentMonth);
}

const date = new Date();
currentYear = date.getFullYear();
currentMonth = date.getMonth();

function obtenerNombreMes(numeroMes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[numeroMes];
}

document.getElementById('toggle-sidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
});

function verClasificacion(id) {
    console.log('ID del concurso:', id);
    window.location.href = `Clasificacion?id=${id}`;
}
function verReserva(id) {
    console.log('ID de la reserva:', id);
    window.location.href = `reserva?id=${id}`;
}

function highlightConcursoDays() {
    const urlD = 'https://riderrank.onrender.com/apiConcurso/datos';
    fetch(urlD)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const date = new Date(item.fecha);
                const key = date.toISOString().split('T')[0]; // Utilizamos la fecha como clave en el objeto de concursosPorFecha
                if (!concursosPorFecha[key]) {
                    concursosPorFecha[key] = [];
                }
                concursosPorFecha[key].push(item);
            });
            createCalendar(); // Una vez que hemos cargado los concursos, creamos el calendario
        })
        .catch(error => console.error('Ha ocurrido un error:', error));

    const urlR = 'https://riderrank.onrender.com/apiReserva/datos';
    fetch(urlR)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const date = new Date(item.fecha);
                const key = date.toISOString().split('T')[0]; // Utilizamos la fecha como clave en el objeto de reservasPorFecha
                if (!reservasPorFecha[key]) {
                    reservasPorFecha[key] = [];
                }
                reservasPorFecha[key].push(item);
            });
            createCalendar(); // Una vez que hemos cargado las reservas, creamos el calendario
        })
        .catch(error => console.error('Ha ocurrido un error:', error));
}

function createCalendar(year, month) {
    const today = new Date();
    const currentYear = year || today.getFullYear();
    const currentMonth = month || today.getMonth();
    const currentDay = today.getDate(); // Obtener el día actual

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Ajuste para que el lunes sea el primer día de la semana

    const tableBody = document.querySelector('#calendar tbody');
    tableBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startingDayOfWeek) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            } else if (date > numDaysInMonth) {
                break;
            } else {
                const cell = document.createElement('td');
                cell.textContent = date;
                const currentDate = new Date(currentYear, currentMonth, date);
                const key = currentDate.toISOString().split('T')[0]; // Utilizamos la fecha como clave en el objeto de concursosPorFecha
                if (concursosPorFecha[key]) {
                    cell.classList.add('concurso');
                    cell.addEventListener('click', function() {
                        const sidebar = document.getElementById('sidebar');
                        sidebar.classList.add('active');
                        const sidebarContent = document.getElementById('sidebar-content');
                        const concursosData = concursosPorFecha[key];
                        let contentHTML = '';
                        concursosData.forEach(concursoData => {
                            contentHTML += `
                                <div class="concurso-info">
                                    <ul>
                                        <li><strong>Organica:</strong> <span>${concursoData.organica}</span></li><br>
                                        <li><strong>Concurso:</strong> <span>${concursoData.concurso}</span></li><br>
                                        <li><strong>Ambito:</strong> <span>${concursoData.ambito}</span></li><br>
                                        <li><strong>Tiempo:</strong> <span>${concursoData.tiempo}</span></li><br>
                                        <li><strong>Altura:</strong> <span>${concursoData.altura}</span></li><br>
                                        <li><strong>Numero:</strong> <span>${concursoData.numero}</span></li><br>
                                        <li><strong>Fecha:</strong> <span>${concursoData.fecha}</span></li>
                                    </ul>
                                    <button class="ver-clasificacion" onclick="verClasificacion('${concursoData.id}')">Ver Clasificacion</button>
                                    <button class="editC" onclick="editCon('${concursoData.id}')">Editar</button>
                                    <button class="eliminarConcurso" onclick="eliminarConcurso('${concursoData.id}')">Eliminar</button>
                                </div>`;
                        });
                        sidebarContent.innerHTML = contentHTML;
                    });
                }
                if (reservasPorFecha[key]) { // Si hay reservas para esta fecha
                    cell.classList.add('reserva'); // Agregar clase 'reserva' para colorear
                    cell.addEventListener('click', function() {
                        const sidebar = document.getElementById('sidebar');
                        sidebar.classList.add('active');
                        const sidebarContent = document.getElementById('sidebar-content');
                        const reservasData = reservasPorFecha[key];
                        let contentHTML = '';
                        reservasData.forEach(reservaData => {
                            contentHTML += `
                                <div class="reserva-info">
                                    <ul>
                                        <li><strong>Organica:</strong> <span>${reservaData.organica}</span></li><br>
                                        <li><strong>Concurso:</strong> <span>${reservaData.concurso}</span></li><br>
                                        <li><strong>Ambito:</strong> <span>${reservaData.ambito}</span></li><br>
                                        <li><strong>Fecha:</strong> <span>${reservaData.fecha}</span></li><br>
                                        <li><strong>Prueba:</strong> <span>${reservaData.prueba}</span></li>
                                    </ul>
                                    <button class="ver-reserva" onclick="verReserva('${reservaData.id}')">Ver reserva</button>
                                    <button class="editR" onclick="editRes('${reservaData.id}')">Editar</button>
                                    <button class="eliminarReserva" onclick="eliminarReserva('${reservaData.id}')">Eliminar</button>
                                    
                                </div>`;
                        });
                        sidebarContent.innerHTML = contentHTML;
                    });
                }
                if (date === currentDay && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    // Si es el día actual, agregar la clase 'today' a la celda
                    cell.classList.add('today');
                }
                row.appendChild(cell);
                date++;
            }
        }
        tableBody.appendChild(row);
    }
}


document.getElementById('ver-clasificacion').addEventListener('click', function() {
    // Verifica si los datos del concurso están disponibles
    if (window.concursoData) {
        // Obtiene el ID del concurso y redirecciona a la página de clasificación
        verClasificacion(window.concursoData.id);
    } else {
        console.error('No hay datos de concurso disponibles');
    }
});

highlightConcursoDays(); // Highlight days with concurso

window.onload = function() {
    updateCalendar();
};

function eliminarConcurso(idConcurso) {
    // Confirmar si realmente se quiere eliminar el concurso
    if (confirm("¿Estás seguro de que deseas eliminar este concurso?")) {
        // Realizar la solicitud fetch para eliminar el concurso
        fetch(`https://riderrank.onrender.com/apiConcurso/${idConcurso}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Si la eliminación es exitosa, mostrar un mensaje de éxito
                alert("Concurso eliminado correctamente.");
            } else {
                // Si hubo un error al eliminar el concurso, mostrar un mensaje de error
                alert("Error al eliminar el concurso.");
            }
        })
        .catch(error => {
            console.error('Ha ocurrido un error:', error);
            // En caso de que haya ocurrido un error inesperado, mostrar un mensaje de error
            alert("Ha ocurrido un error al procesar la solicitud.");
        });
    }
}

function eliminarReserva(idReserva) {
    // Confirmar si realmente se quiere eliminar el concurso
    if (confirm("¿Estás seguro de que deseas eliminar este reserva?")) {
        // Realizar la solicitud fetch para eliminar el concurso
        fetch(`https://riderrank.onrender.com/apiReserva/${idReserva}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Si la eliminación es exitosa, mostrar un mensaje de éxito
                alert("Reserva eliminada correctamente.");
            } else {
                // Si hubo un error al eliminar el concurso, mostrar un mensaje de error
                alert("Error al eliminar la reserva.");
            }
        })
        .catch(error => {
            console.error('Ha ocurrido un error:', error);
            // En caso de que haya ocurrido un error inesperado, mostrar un mensaje de error
            alert("Ha ocurrido un error al procesar la solicitud.");
        });
    }
}

function editRes(idRes){
    if (!idRes) {
        console.error('El ID del mensaje es undefined.');
        return;
    }
    fetch(`https://riderrank.onrender.com/apiReserva/${idRes}`)
        .then(response => response.json())
        .then(() => {
            const queryParams = new URLSearchParams({ id: idRes }).toString();
            window.location.href = `editorR?${queryParams}`;
        })
        .catch(error => console.error('Error al obtener los datos del mensaje:', error));
}

function editCon(idCon){
    if (!idCon) {
        console.error('El ID del mensaje es undefined.');
        return;
    }
    fetch(`https://riderrank.onrender.com/apiConcurso/${idCon}`)
        .then(response => response.json())
        .then(() => {
            const queryParams = new URLSearchParams({ id: idCon }).toString();
            window.location.href = `editorC?${queryParams}`;
        })
        .catch(error => console.error('Error al obtener los datos del mensaje:', error));
}
