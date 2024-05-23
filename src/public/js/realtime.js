const socket = io ()
const role = document.getElementById("role").textContent.trim();
const email = document.getElementById("email").textContent.trim();

socket.on("productos", (data) => {
    renderProductos(data);
})

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.docs.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-3");

        card.innerHTML = `
            <div class="card">
                <img src="${item.img}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Precio: $${item.price}</p>
                    <button class="btn btn-danger">Eliminar</button>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item._id);
        });
    });
};



const eliminarProducto = (id) =>  {
    socket.emit("eliminarProducto", id);
}

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
})


const agregarProducto = () => {
    const role = document.getElementById("role").textContent.trim();
    const email = document.getElementById("email").textContent.trim();
    
    const owner = role === "premium" ? email : "admin";
           
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        status: document.getElementById("status").value === "true",
        category: document.getElementById("category").value,
        details: {
            year: document.getElementById("year").value,
            engine: document.getElementById("engine").value,
            transmission: document.getElementById("transmission").value,
            drivetrain: document.getElementById("drivetrain").value
        },
        owner

    };
    mostrarMensaje("Producto agregado correctamente");
    limpiarCampos()

    socket.emit("agregarProducto", producto);
}

const mostrarMensaje = (mensaje) => {
    alert(mensaje);
};

const limpiarCampos = () => {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("img").value = "";
    document.getElementById("code").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";
    document.getElementById("status").value = "true";
    document.getElementById("year").value = "";
    document.getElementById("engine").value = "";
    document.getElementById("transmission").value = "";
    document.getElementById("drivetrain").value = "";
};