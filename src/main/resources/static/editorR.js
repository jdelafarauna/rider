document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const orgInput = document.getElementById('organic');
    const contestInput = document.getElementById('contest');
    const ambitInput = document.getElementById('ambit');
    const dateInput = document.getElementById('date');
    const trialInput = document.getElementById('trial');

    const resId = urlParams.get('id');

    // Realizar la solicitud GET al servidor para obtener los datos del recurso
    fetch(`https://riderrank.onrender.com/apiReserva/${resId}`)
        .then(response => response.json())
        .then(data => {
            // Llenar los campos del formulario con los datos obtenidos
            orgInput.value = data.organica || '';
            contestInput.value = data.concurso || '';
            ambitInput.value = data.ambito || '';

            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const fechaActual = `${year}-${month}-${day}`;

            dateInput.value = data.fecha || fechaActual;
            dateInput.min = fechaActual;

            trialInput.value = data.prueba || '';
        })
        .catch(error => console.error('Error al obtener los datos del servidor:', error));
        
    const resForm = document.getElementById('resForm');
    resForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío predeterminado del formulario
        
        

        const resId = urlParams.get('id');
        const updatedOrg = orgInput.value;
        const updatedContest = contestInput.value;
        const updatedAmbit = ambitInput.value;
        const updatedDate = dateInput.value;
        const updatedTrial = trialInput.value;

        if (!updatedOrg || !updatedContest || !updatedAmbit || !updatedDate || !updatedTrial) {
            alert("Por favor, complete todos los campos del formulario.");
            return;
        }
        
        const formData = {
            organica: updatedOrg,
            concurso: updatedContest,
            ambito: updatedAmbit,
            fecha: updatedDate,
            prueba: updatedTrial
        };

        // Realizar la solicitud PATCH al servidor
        fetch(`https://riderrank.onrender.com/apiReserva/${resId}`, {
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