import autenticarUsuario from "../repositories/session.repository.js";
import hashbcrypt from "../utils/hashbcrypt.js";
import { logger } from "../utils/logger.js";

import userModel from "../models/user.model.js"
import generateResetToken from "../utils/token.js";
import EmailManager from "../services/email.js";

const emailManager = new EmailManager()
const {createHash ,validPassword} = hashbcrypt

class sessionController {
    async login (req,res) {
        autenticarUsuario (req, res, async () =>{
            try {
                if(!req.user){
                    return res.status(400).send({ status: "error" });
                }
                req.session.user = {
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    age: req.user.age,
                    email: req.user.email,
                    cartId: req.user.cart,
                    role: req.user.role
                  };
                  req.session.login = true;
                  res.redirect("/profile");
            } catch (error) {
                res.status(500).send({ status: "error", message: "Error en el servidor" });
                logger.error("Error al ejecutar funcion de autenticacion en el servidor", error)

            }
        }) 
    }

    async faillogin (req, res) {
        try {
            res.status(401).render('login', { error: '¡Ups! Parece que tus credenciales de inicio de sesión son incorrectas. Por favor, revisa tu nombre de usuario y contraseña y vuelve a intentarlo.' });
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
            logger.error("Error al ejecutar funcion de autenticacion en el servidor", error)


        }
    }

    async logout (req, res) {
        try {
            if (req.session.login) {
                req.session.destroy()
             }
             res.redirect("/")
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
            logger.error("Error al ejecutar funcion de logout en el servidor", error)

 
        }
    }
    async requestPasswordReset (req, res) {
        const {email} = req.body
         try {
            const user = await userModel.findOne({email})
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }
            const token = generateResetToken()

            user.resetToken = {
                token: token,
                expiresAt: new Date(Date.now() + 3600000)
            }
            await user.save()
            await emailManager.passwordReset(email, user.first_name, token)

            res.redirect("/confirmacion-envio")

         } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
            logger.error("Error al ejecutar funcion de reestablecer contraseña en el servidor", error)


         }
    }

    async resetPassword (req, res) {
        const {email, password, token} = req.body
        try {
            const user = await userModel.findOne({email})
            if (!user) {
                return res.render("formulario-Cambio-Password", {error: "Usuario no encontrado"})
            }    
            
            const resetToken = user.resetToken
            if(!resetToken || resetToken.token !== token ) {
                return res.render("formulario-Cambio-Password", {error: "El token indicado es incorrecto"})
            }

            const now = new Date()
            if (now > resetToken.expiresAt) {
                return res.render("passwordreset",{error: "El token se encuentra vencido, por favor solicitar de nuevo"})
            }

            if(validPassword (password, user)) {
                return res.render("formulario-Cambio-Password", {error: "La nueva contraseña no puede ser igual a la anterior"})
            }

            user.password = createHash(password)
            user.resetToken = undefined
            await user.save()

            return res.render("confirmacion-Cambio-Password")
            
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
            logger.error("Error al ejecutar funcion de cambio de contraseña en el servidor", error)
        }
    }
}

export default sessionController