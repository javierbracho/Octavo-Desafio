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

            // Lista de documentos requeridos
            const requiredDocuments = ["identificacion", "comprobante-de-domicilio", "comprobante-de-estado-de-cuenta"];
            
            // Verificar si todos los documentos requeridos están presentes
            const userDocuments = user.documents.map(doc => doc.name);
            const allDocumentsPresent = requiredDocuments.every(doc => userDocuments.includes(doc));

            if (!allDocumentsPresent) {
                throw new Error("Usuario debe adjuntar todos los documentos requeridos");
            }

            // Cambiar el rol del usuario
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
    
            const documents = [];
    
            if (uploadedDocuments.profile) {
                documents.push(...uploadedDocuments.profile.map((doc) => ({
                    name: `profile_${doc.originalname}`, // Asigna prefijo para identificación
                    reference: doc.path
                })));
            }
    
            if (uploadedDocuments.products) {
                documents.push(...uploadedDocuments.products.map((doc) => ({
                    name: `products_${doc.originalname}`, // Asigna prefijo para identificación
                    reference: doc.path
                })));
            }
    
            if (uploadedDocuments.identificacion) {
                documents.push(...uploadedDocuments.identificacion.map((doc) => ({
                    name: doc.fieldname, // Asigna prefijo para identificación
                    reference: doc.path
                })));
            }
    
            if (uploadedDocuments["comprobante-de-domicilio"]) {
                documents.push(...uploadedDocuments["comprobante-de-domicilio"].map((doc) => ({
                    name: doc.fieldname, // Asigna prefijo para identificación
                    reference: doc.path
                })));
            }
    
            if (uploadedDocuments["comprobante-de-estado-de-cuenta"]) {
                documents.push(...uploadedDocuments["comprobante-de-estado-de-cuenta"].map((doc) => ({
                    name: doc.fieldname, // Asigna prefijo para identificación
                    reference: doc.path
                })));
            }
    
            user.documents = documents; // Actualiza los documentos
            await user.save();
        } catch (error) {
            logger.error("Error al subir archivos al servidor", error);
            throw new Error("Error al subir archivos para cambio de rol del usuario");
        }
    }
    
}

export {autenticarUsuario, sessionRepository}