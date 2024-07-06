document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const messageId = urlParams.get('id');

    if (messageId) {
        // Realizar una solicitud GET al servidor para obtener los detalles del mensaje
        fetch(`https://riderrank.onrender.com/apiContacto/${messageId}`)
            .then(response => {
                if (response.ok) {
                    return response.json(); // Convertir la respuesta a JSON
                } else {
                    throw new Error('Error al obtener los detalles del mensaje.');
                }
            })
            .then(data => {
                // Rellenar los campos del formulario con la información obtenida
                document.getElementById('mail').value = data.correo || '';
                document.getElementById('matter').value = data.asunto || '';
                document.getElementById('description').value = data.descripcion || '';
            })
            .catch(error => {
                console.error('Ha ocurrido un error al obtener los detalles del mensaje:', error);
            });
    }

    const contactForm = document.getElementById('ContactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío predeterminado del formulario

        const updatedMail = document.getElementById('mail').value;
        const updatedMatter = document.getElementById('matter').value;
        const updatedDescription = document.getElementById('description').value;

        const formData = {
            correo: updatedMail,
            asunto: updatedMatter,
            descripcion: updatedDescription
        };

        // Realizar la solicitud PATCH al servidor
        fetch(`https://riderrank.onrender.com/apiContacto/${messageId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Si la solicitud PATCH es exitosa, redirigir a otra página o realizar otras acciones según sea necesario
                console.log('Mensaje editado exitosamente');
                // Ejemplo de redirección a otra página
                window.location.href = 'mensajes';
            } else {
                console.error('Error al editar el mensaje.');
            }
        })
        .catch(error => {
            console.error('Ha ocurrido un error al procesar la solicitud:', error);
        });
    });
});