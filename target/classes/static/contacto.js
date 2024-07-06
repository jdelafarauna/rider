
const urlC = 'https://riderrank.onrender.com/apiContacto/posts';

document.getElementById('Contactoform').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtiene los valores de los campos del formulario
    var correo = document.getElementById('correo').value;

    var goodEmail = /\S+@\S+\.\S+/;

    if (!goodEmail.test(correo)) {
        alert('Por favor, ingresa una direccion de correo electronico valida.');
        return;
    }
    
    var asunto = document.getElementById('asunto').value;
    var descripcion = document.getElementById('descripcion').value;

    const data = {
        correo: document.getElementById('correo').value,
        asunto: document.getElementById('asunto').value,
        descripcion: document.getElementById('descripcion').value,
    };

    fetch(urlC, {
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
    document.getElementById('correo').value = '';
    document.getElementById('asunto').value = '';
    document.getElementById('descripcion').value = '';

});

const boton = document.getElementById('consult');

// Agregar un event listener para el click en el botón
boton.addEventListener('click', function() {
    // Redirigir a otra página
    window.location.href = 'mensajes';
});


