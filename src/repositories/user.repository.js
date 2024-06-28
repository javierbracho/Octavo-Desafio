import passport from "passport";
import hashbrypt from "../utils/hashbcrypt.js"
import userModel from "../models/user.model.js"
import { logger } from "../utils/logger.js";
import EmailManager from "../services/email.js";

const emailManager = new EmailManager()



const nuevoUsuario = passport.authenticate("user", {failureRedirect: "/user/failedregister"})

class userRepository {
    async getUsers() {
        try {
            const users = await userModel.find().select('first_name last_name email role');
            return users       
        } catch (error) {
            logger.error("Error al llamar a los usuarios:", error);
            throw new Error("Error al obtener usuarios");
        }
    }

    async deleteUsers() {
        try {
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
            // Encuentra los usuarios que serán eliminados
            const usersToDelete = await userModel.find({ last_connection: { $lt: twoDaysAgo } });
    
            // Enviar correos a cada usuario que será eliminado
            for (const user of usersToDelete) {
                await emailManager.deleteUserNotification(user.email, user.first_name);
            }
    
            // Eliminar a los usuarios
            const result = await userModel.deleteMany({ last_connection: { $lt: twoDaysAgo } });
            logger.info(`Se eliminaron ${result.deletedCount} usuarios con last_connection anterior a ${twoDaysAgo}`);
    
            return result;
        } catch (error) {
            logger.error("Error al eliminar a los usuarios:", error);
            throw new Error("Error al eliminar usuarios");
        }
    }
    
}

export  {nuevoUsuario, userRepository }