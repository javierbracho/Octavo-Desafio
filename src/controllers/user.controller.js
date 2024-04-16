import hashbcrypt from "../utils/hashbcrypt.js";
import nuevoUsuario from "../repositories/user.repository.js";

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
            };
            req.session.login = true;
            res.redirect("/products");
        });
    }

    async failedRegister (req, res) {
        res.send({error: "Error al registrar"});
    }
}

export default userController;
