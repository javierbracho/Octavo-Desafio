document.getElementById('delete-inactive-users').addEventListener('click', function() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez eliminados, no podrás recuperar estos usuarios inactivos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch('/user/delete', {
                    method: 'DELETE'
                });

                if (response.ok) {
                    Swal.fire(
                        'Eliminados',
                        'Los usuarios inactivos han sido eliminados.',
                        'success'
                    ).then(() => {
                        location.reload(); // Recargar la página para reflejar los cambios
                    });
                } else {
                    Swal.fire(
                        'Error',
                        'Error al eliminar usuarios inactivos.',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire(
                    'Error',
                    'Error al eliminar usuarios inactivos.',
                    'error'
                );
            }
        }
    });
});
