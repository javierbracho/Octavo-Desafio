document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginAlert').addEventListener('click', function(event) {
        event.preventDefault();
        
        Swal.fire({
            icon: 'info',
            title: 'Iniciar sesión',
            text: 'Por favor, inicie sesión para acceder a su carrito.',
            showConfirmButton: true,
            confirmButtonText: 'Iniciar sesión',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login';
            }
        });
    });
});