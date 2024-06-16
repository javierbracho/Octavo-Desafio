import passport from "passport";
import hashbcrypt from "../utils/hashbcrypt.js"
import userModel from "../models/user.model.js"
import generateResetToken from "../utils/token.js";
import EmailManager from "../services/email.js";
import { logger } from "../utils/logger.js";


const emailManager = new EmailManager()
const {createHash ,validPassword} = hashbcrypt

const autenticarUsuario = passport.authenticate("login", {failureRedirect: "/session/faillogin"})

class sessionRepository {
    async requestPasswordReset(email) {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            const token = generateResetToken();
            user.resetToken = {
                token: token,
                expiresAt: new Date(Date.now() + 3600000)
            };
            await user.save();
            await emailManager.passwordReset(email, user.first_name, token);
        } catch (error) {
            logger.error("Error al solicitar restablecimiento de contraseña:", error);
            throw new Error("Error al solicitar restablecimiento de contraseña");
        }
    }
    async resetPassword(email, password, token) {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            const resetToken = user.resetToken;
            if (!resetToken || resetToken.token !== token) {
                throw new Error("El token indicado es incorrecto");
            }

            const now = new Date();
            if (now > resetToken.expiresAt) {
                throw new Error("El token se encuentra vencido, por favor solicitar de nuevo");
            }

            if (validPassword(password, user)) {
                throw new Error("La nueva contraseña no puede ser igual a la anterior");
            }

            user.password = createHash(password);
            user.resetToken = undefined;
            await user.save();

            return true;
        } catch (error) {
            logger.error("Error al ejecutar función de cambio de contraseña en el servidor:", error);
            throw new Error("Error al cambiar la contraseña");
        }
    }
    async changeRole(uid) {
        try {
            const user = await userModel.findById(uid);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            const newRole = user.role === "user" ? "premium" : "user";
            const updatedUser = await userModel.findByIdAndUpdate(uid, { role: newRole }, { new: true });
            return updatedUser;
        } catch (error) {
            logger.error("Error al ejecutar función de cambio de rol en el servidor:", error);
            throw new Error("Error al cambiar el rol del usuario");
        }
    }
    async uploadFiles(uid, uploadedDocuments) {
        
        try {
            const user = await userModel.findById(uid);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            if (uploadedDocuments) {
                if (uploadedDocuments.document) {
                    user.documents = user.documents.concat(uploadedDocuments.document.map(doc => ({
                        name: doc.originalname,
                        reference: doc.path
                    })));
                }
                if (uploadedDocuments.products) {
                    user.documents = user.documents.concat(uploadedDocuments.products.map(doc => ({
                        name: doc.originalname,
                        reference: doc.path
                    })));
                }
                if (uploadedDocuments.profile) {
                    user.documents = user.documents.concat(uploadedDocuments.profile.map(doc => ({
                        name: doc.originalname,
                        reference: doc.path
                    })));
                }
            }
            await user.save();
        } catch (error) {
            logger.error("Error al subir archivos al servidor", error);
            throw new Error("Error al subir archivos para cambio de rol del usuario");
        }
    }
    
}

export {autenticarUsuario, sessionRepository}