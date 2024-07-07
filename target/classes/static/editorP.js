document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nameInput = document.getElementById('name');
    const horseInput = document.getElementById('horse');
    const knocksInput = document.getElementById('knocks');
    const disobInput = document.getElementById('disob');
    const elimInput = document.getElementById('elim');
    const fallInput = document.getElementById('fall');
    const timeInput = document.getElementById('time');
    const obsInput = document.getElementById('obs');
    
    const id = urlParams.get('id');

    // Realizar la solicitud GET al servidor para obtener los datos del recurso
    fetch(`https://riderrank.onrender.com/apiCompetidor/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log('Data from server:', data); // Log data received from the server
            
            // Fill the form fields with the data obtained
            nameInput.value = (data.nombre !== undefined && data.nombre !== null) ? data.nombre : '';
            horseInput.value = (data.caballo !== undefined && data.caballo !== null) ? data.caballo : '';
            knocksInput.value = (data.derribos !== undefined) ? data.derribos : 0;
            disobInput.value = (data.desobedencias !== undefined) ? data.desobediencias : 0;
            elimInput.checked = (data.eliminado !== undefined && data.eliminado !== null) ? data.eliminado : '';
            fallInput.checked = (data.caido !== undefined && data.caido !== null) ? data.caido : '';
            timeInput.value = (data.tiempo !== undefined && data.tiempo !== null) ? data.tiempo : '';
            obsInput.value = (data.observaciones !== undefined && data.observaciones !== null) ? data.observaciones : '';
        })
        .catch(error => console.error('Error fetching data from server:', error));

        const contForm = document.getElementById('contForm');
        contForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar el envío predeterminado del formulario
            
            
    
            const contId = urlParams.get('id');
            const updatedName = nameInput.value;
            const updatedHorse = horseInput.value;
            const updatedKnocks = knocksInput.value;
            const updatedDisob = disobInput.value;
            const updatedElim= elimInput.checked;
            const updatedFall = fallInput.checked;
            const updatedTime = timeInput.value;
            const updatedObs = obsInput.value;
            
            const formData = {
                nombre: updatedName,
                caballo: updatedHorse,
                derribos: updatedKnocks,
                desobediencias: updatedDisob,
                eliminado: updatedElim,
                caido: updatedFall,
                tiempo: updatedTime,
                observaciones: updatedObs,
            };
            console.log(formData);
            // Realizar la solicitud PATCH al servidor
            fetch(`https://riderrank.onrender.com/apiCompetidor/${contId}`, {
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
                    window.location.href = 'calendario';
                } else {
                    console.error('Error al editar el mensaje.');
                }
            })
            .catch(error => {
                console.error('Ha ocurrido un error al procesar la solicitud:', error);
            });
        });
});
