
const urlP = 'https://riderrank.onrender.com/apiConcurso/{id}/posts';

document.getElementById('CompetidorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtiene los valores de los campos del formulario
    var user = document.getElementById('user').value;
    var title = document.getElementById('title').value;
    var text = document.getElementById('text').value;

    // Crea el objeto 'data' con los valores obtenidos del formulario
    const data = {
        user: user,
        title: title,
        text: text
    };

    // Puedes realizar cualquier acción aquí con los valores obtenidos, como enviarlos a través de AJAX

    // O enviarlos a través de AJAX a un servidor
    fetch(urlP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log('Nuevo post creado:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Finalmente, puedes limpiar los campos del formulario si es necesario
    document.getElementById('user').value = '';
    document.getElementById('title').value = '';
    document.getElementById('text').value = '';
});
