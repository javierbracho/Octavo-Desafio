import hashbcrypt from "../utils/hashbcrypt.js";
import {nuevoUsuario, userRepository} from "../repositories/user.repository.js";
import { logger } from "../utils/logger.js";


const UserRepository = new userRepository()

class userController {
    async userRegister (req, res) {
        nuevoUsuario(req, res, async () => {
            if (!req.user) {
                return res.status(400).send ({status:"error"})
            }
            req.session.user = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                age: req.user.age,
                email: req.user.email,
                cartId: req.user.cart,
                role: req.user.role,
                id: req.user._id

            };
            req.session.login = true;
            console.log(req.session.user)
            res.redirect("/profile");
        });
    }

    async failedRegister (req, res) {
        res.send({error: "Error al registrar"});
    }

    async getUsers (req,res) {
        try {
            const users = await UserRepository.getUsers()
            const arrayUsers = users.map(user => ({
                _id: user._id.toString(),
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
            }));
            res.render("users", {
               users: arrayUsers
            })
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error mostrar usuarios" });
            logger.error("Error al ejecutar función de busqueda de usuarios:", error);
    }
    }
    async deleteUsers (req, res) {
        try {
            const result = await UserRepository.deleteUsers();
            res.json({ message: `Se eliminaron ${result.deletedCount} usuarios con ultima conexion anterior a dos días atrás` });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar usuarios antiguos" });
        }
    }

}

export default userController;
