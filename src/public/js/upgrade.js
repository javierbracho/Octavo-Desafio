document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');

    if (container) {
        const userId = container.getAttribute('data-userid');

        const message = container.getAttribute('data-message');
        const status = container.getAttribute('data-status');

        if (message && status) {
            Swal.fire({
                icon: status === 'success' ? 'success' : 'error',
                title: status === 'success' ? 'Éxito' : 'Error',
                text: message,
            });
        }

        const activarBtn = document.getElementById('activarPremium');

        if (activarBtn) {
            activarBtn.addEventListener('click', function(event) {
                event.preventDefault(); 

                if (userId) {
                    fetch(`/session/premium/${userId}`, {
                        method: 'PUT'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al activar cuenta premium');
                        }
                        return response.json();
                    })
                    .then(data => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Éxito',
                            text: data.message
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.message
                        });
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo obtener el ID del usuario'
                    });
                }
            });
        }
    }
});
