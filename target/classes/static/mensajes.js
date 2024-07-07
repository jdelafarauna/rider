function toggleNoMessagesMessage() {
    const noMensajesElement = document.getElementById("no-mensajes");
    const preguntasElement = document.getElementById("preguntas");

    if (preguntasElement.children.length === 0) {
        noMensajesElement.style.display = "block";
    } else {
        noMensajesElement.style.display = "none";
    }

    // Obtener todos los elementos con clase "edit"
    const editButtons = document.querySelectorAll('.edit');

    // Agregar evento de clic a cada botón de editar
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const messageId = button.dataset.messageId;
            editMessage(messageId, button.parentNode);
        });
    });
}

fetch('https://riderrank.onrender.com/apiContacto/datos')
    .then(response => response.json())
    .then(data => {
        // Iterar sobre los datos y mostrarlos en forma de foro
        data.forEach(pregunta => {
            var preguntaHTML = `
                <div class="pregunta">
                    <h2>${pregunta.asunto}</h2>
                    <hr>
                    <p><strong>Correo:</strong> ${pregunta.correo}</p>
                    <p><strong>Descripcion:</strong> ${pregunta.descripcion}</p>
                    <button class="edit" onclick="editMessage('${pregunta.id}', this.parentNode)">Editar</button>
                    <button class="delete" onclick="deleteMessage('${pregunta.id}', this.parentNode)">Eliminar</button>
                </div>
            `;
            document.getElementById("preguntas").innerHTML += preguntaHTML;
        });

        toggleNoMessagesMessage(); // Llamar a la función para mostrar u ocultar el mensaje "No hay mensajes"
    })
    .catch(error => console.error('Error al obtener los datos:', error));

function editMessage(messID) {
    if (!messID) {
        console.error('El ID del mensaje es undefined.');
        return;
    }

    fetch(`https://riderrank.onrender.com/apiContacto/${messID}`)
        .then(response => response.json())
        .then(() => {
            const queryParams = new URLSearchParams({ id: messID }).toString();
            window.location.href = `editorM?${queryParams}`;
        })
        .catch(error => console.error('Error al obtener los datos del mensaje:', error));
}

function deleteMessage(messId, element) {
    // Confirmar si realmente se quiere eliminar el mensaje
    if (confirm("¿Estás seguro de que deseas eliminar este mensaje?")) {
        // Realizar la solicitud fetch para eliminar el mensaje
        fetch(`https://riderrank.onrender.com/apiContacto/${messId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Si la eliminación es exitosa, eliminar el elemento del DOM
                element.remove();
                // Mostrar un mensaje de éxito
                toggleNoMessagesMessage(); // Llamar a la función para mostrar u ocultar el mensaje "No hay mensajes"
            } else {
                // Si hubo un error al eliminar el mensaje, mostrar un mensaje de error
                alert("Error al eliminar el mensaje.");
            }
        })
        .catch(error => {
            console.error('Ha ocurrido un error:', error);
            // En caso de que haya ocurrido un error inesperado, mostrar un mensaje de error
            alert("Ha ocurrido un error al procesar la solicitud.");
        });
    }
}