import {autenticarUsuario, sessionRepository} from "../repositories/session.repository.js";
import { logger } from "../utils/logger.js";

const SessionRepository = new sessionRepository ()

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
        const { email } = req.body;
        try {
            await SessionRepository.requestPasswordReset(email);
            res.redirect("/confirmacion-envio");
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
            logger.error("Error al solicitar restablecimiento de contraseña en el servidor:", error);
        }
    }

    async resetPassword (req, res) {
        const { email, password, token } = req.body;
        try {
            await SessionRepository.resetPassword(email, password, token);
            res.render("confirmacion-Cambio-Password");
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
            logger.error("Error al ejecutar función de cambio de contraseña en el servidor:", error);
        }
    }

    async changeRole (req, res) {
        const { uid } = req.params;
        try {
            const updatedUser = await repository.changeRole(uid);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
            logger.error("Error al ejecutar función de cambio de rol en el servidor:", error);
        }   
    }
}

export default sessionController