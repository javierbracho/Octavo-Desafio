function eliminarProducto(cartId, productId) {
    fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el producto del carrito');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function vaciarCarrito(cartId) {
    fetch(`/api/carts/${cartId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al vaciar el carrito');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const deleteProductButtons = document.querySelectorAll('.delete-product-btn');
    deleteProductButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const cartId = button.dataset.cartId;
            const productId = button.dataset.productId;
            console.log('Clic en el botón Eliminar producto');
            console.log('Cart ID:', cartId);
            console.log('Product ID:', productId);
            eliminarProducto(cartId, productId);
        });
    });

    const vaciarCarritoButton = document.getElementById('vaciar-carrito-btn');
    if (vaciarCarritoButton) {
        vaciarCarritoButton.addEventListener('click', function(event) {
            const cartId = vaciarCarritoButton.dataset.cartId;
            console.log('Clic en el botón Vaciar carrito');
            console.log('Cart ID:', cartId);
            vaciarCarrito(cartId);
        });
    }
});
