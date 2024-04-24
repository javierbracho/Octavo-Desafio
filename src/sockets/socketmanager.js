import { Server } from "socket.io";
import messagesModel from "../models/messages.js";
import productRepository from "../repositories/product.repository.js"

const ProductRepository = new productRepository()

class SocketManager {
    constructor(HttpServer) {
        this.io = new Server(HttpServer)
        this.initSocketEvents()
    }
    async initSocketEvents () {
        this.io.on("connection", async (socket) => {
            console.log("Se conectó un usuario");

            socket.emit("productos", await ProductRepository.getProducts({}));

            socket.on("eliminarProducto", async (id) => {
                await ProductRepository.deleteProduct(id);
                this.emitUpdatedProducts(socket);
            });

            socket.on("agregarProducto", async (producto) => {
                await ProductRepository.addProduct(producto);
                this.emitUpdatedProducts(socket);
            });


            //Chatbox
            const messages = await messagesModel.find();
            socket.emit("messages", messages);

            socket.on("message", async (data) => {
                await messagesModel.create(data);
                const updatedMessages = await messagesModel.find();
                io.sockets.emit("messages", updatedMessages);
              });
        })
    }
    async emitUpdatedProducts(socket) {
        socket.emit("productos", await ProductRepository.getProducts({}));
    }
}

export default SocketManager