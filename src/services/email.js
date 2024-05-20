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
}

export default EmailManager