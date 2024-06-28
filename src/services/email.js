import nodemailer from "nodemailer"
import { logger } from "../utils/logger.js"

class EmailManager {
    constructor () {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: "jbracho07@gmail.com",
                pass: "dlsf vmdi kqcz ntzk"
            }
        })
    }

    async buyConfirmation(email, first_name, ticket) {
        try {
            const mailOptions = {
                from: "jbracho07@gmail.com",
                to: email,
                subject: "Confirmacion de compra",
                html: `
                    <h1>Confirmación de compra</h1>
                    <p>Gracias por tu compra, ${first_name}!</p>
                    <p>El número de tu orden es: ${ticket}</p>
                    `
            }
            await this.transporter.sendMail(mailOptions)
        } catch (error) {
            logger.error("error al enviar el email de compra", error)
        }
    }
    async passwordReset (email, first_name, token) {
        try {
            const mailOptions = {
                from: "jbracho07@gmail.com",
                to: email,
                subject: "Reestablecer contraseña",
                html: `<h1>Restablecimiento de Contraseña</h1>
                        <p>Hola ${first_name},</p>
                        <p>Has solicitado restablecer tu contraseña. Utiliza el siguiente código para cambiar tu contraseña:</p>
                        <p><strong>${token}</strong></p>
                        <p>Este código expirará en 1 hora.</p>
                        <a href="http://localhost:8080/password">Restablecer Contraseña</a>
                        <p>Si no solicitaste este restablecimiento, ignora este correo.</p>
                    `
            }
            await this.transporter.sendMail(mailOptions)
        } catch (error) {
            logger.error("error al enviar el email de reestablecimiento de contraseña", error)

        }
    }
    async deleteUserNotification (email, first_name) {
        try {
            const mailOptions = {
                from: "jbracho07@gmail.com",
                to: email,
                subject: "Notificacion de eliminacion de cuenta por inactividad",
                html: `<h1>Eliminacion de cuenta</h1>
                        <p>Hola ${first_name},</p>
                        <p>Debido a la inactividad de la cuenta registrada con el correo ${email} se ha procedido a la eliminacion de la misma.</p>
                        <p>Te invitamos a que si deseas activar nuevamente tu cuenta para seguir realizando compras, por favor puedas suscribirte nuevamente en el siguiente enlance:</p>
                        <a href="http://localhost:8080/login">Suscripcion</a>
                        <p>Si esté no es tu correo, por favor ignora este mensaje.</p>
                    `
            }
            await this.transporter.sendMail(mailOptions)

        } catch (error) {
            logger.error("error al enviar el email de eliminacion de cuenta", error)

        }
    }

    async deleteProductNotification (email, first_name, title) {
        try {
            const mailOptions = {
                from: "jbracho07@gmail.com",
                to: email,
                subject: "Notificacion de eliminacion de producto publicado",
                html: `
                <h1>Eliminación de producto</h1>
                <p>Hola ${first_name},</p>
                <p>Queremos informarte que tu producto titulado "<strong>${title}</strong>" ha sido eliminado de nuestra plataforma.</p>
                <p>Este mensaje se envía porque la cuenta registrada con el correo ${email} no ha mostrado actividad reciente. Si deseas volver a publicar tu producto o realizar otras acciones en nuestra plataforma, te invitamos a iniciar sesión nuevamente:</p>
                <a href="http://localhost:8080/login">Iniciar sesión</a>
                <p>Si este no es tu correo, por favor ignora este mensaje.</p>
                <p>Gracias por tu comprensión,</p>
                <p>El equipo de Peugeot</p>
            `
            }
            await this.transporter.sendMail(mailOptions)
        } catch (error) {
            logger.error("error al enviar el email de eliminacion de producto", error)

        }
    }
}

export default EmailManager