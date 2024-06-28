document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', async function(event) {
            event.preventDefault();
            
            const form = button.closest('.cart-form');
            const cartId = form.getAttribute('data-cart-id');
            const productId = form.getAttribute('data-product-id');
            
            try {
                const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: data.type,
                    title: data.message
                });

            } catch (error) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: 'Ocurrió un error al agregar el producto al carrito.'
                });
            }
        });
    });
});

