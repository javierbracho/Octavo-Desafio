document.addEventListener('DOMContentLoaded', function() {
    const loginAlert = document.getElementById('loginAlert');
    const modelLink = document.getElementById('modelLink');

    // Función genérica para mostrar SweetAlert2
    function showLoginAlert(title, text, redirectUrl) {
        Swal.fire({
            icon: 'info',
            title: title,
            text: text,
            showConfirmButton: true,
            confirmButtonText: 'Iniciar sesión',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = redirectUrl;
            }
        });
    }

    // Event listener para el enlace "Modelos"
    if (modelLink) {
        modelLink.addEventListener('click', function(event) {
            event.preventDefault();
            showLoginAlert('Iniciar sesión', 'Por favor, inicie sesión para acceder al catálogo de modelos.', '/login');
        });
    }

    // Event listener para el enlace de alerta de login
    if (loginAlert) {
        loginAlert.addEventListener('click', function(event) {
            event.preventDefault();
            showLoginAlert('Iniciar sesión', 'Por favor, inicie sesión para acceder a su carrito.', '/login');
        });
    }
});




