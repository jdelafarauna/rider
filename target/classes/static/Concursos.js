const urlC = 'https://riderrank.onrender.com/apiConcurso/posts';

document.getElementById('Concursoform').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtiene los valores de los campos del formulario
    var organica = document.getElementById('organica').value;
    var concurso = document.getElementById('concurso').value;
    var ambito = document.getElementById('ambito').value;
    var tiempo = parseInt(document.getElementById('tiempo').value);
    var altura = parseInt(document.getElementById('altura').value);
    var numero = parseInt(document.getElementById('numero').value);
    var fecha = document.getElementById('fecha').value;
    // Suponiendo que 'participante' es un array de objetos con propiedades 'nombre' y 'edad'
    var participanteElements = document.querySelectorAll('.participante');
    var participante = [];
    


    // Crea el objeto 'data' con los valores obtenidos del formulario
    const data = {
        organica: document.getElementById('organica').value,
        concurso: document.getElementById('concurso').value,
        ambito: document.getElementById('ambito').value,
        tiempo: parseInt(document.getElementById('tiempo').value),
        altura: parseInt(document.getElementById('altura').value),
        numero: parseInt(document.getElementById('numero').value),
        fecha: document.getElementById('fecha').value,
        participante: []
    };

    // Puedes realizar cualquier acción aquí con los valores obtenidos, como enviarlos a través de AJAX

    // O enviarlos a través de AJAX a un servidor
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
        //window.location.href = '/concurso/';
       
    
    })
    .catch(error => {
        console.error('Error:', error);
    });
    

    // Finalmente, puedes limpiar los campos del formulario si es necesario
    document.getElementById('organica').value = '';
    document.getElementById('concurso').value = '';
    document.getElementById('ambito').value = '';
    document.getElementById('tiempo').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('fecha').value = '';
});