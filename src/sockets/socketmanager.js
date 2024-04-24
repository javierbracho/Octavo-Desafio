import { Server } from "socket.io";
import messagesModel from "../models/messages.js";

class SocketManager {
    constructor(HttpServer) {
        this.io = new Server(HttpServer)
        this.initSocketEvents()
    }
    async initSocketEvents () {
        this.io.on("connection", async (socket) => {
            console.log("Se conectó un usuario");



            const messages = await messagesModel.find();
            socket.emit("messages", messages);

            socket.on("message", async (data) => {
                await messagesModel.create(data);
                const updatedMessages = await messagesModel.find();
                io.sockets.emit("messages", updatedMessages);
              });
        })
    }
}

export default SocketManager