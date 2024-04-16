import autenticarUsuario from "../repositories/session.repository.js";
import hashbcrypt from "../utils/hashbcrypt.js";

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
                  };
              
                  req.session.login = true;
                  res.redirect("/products");
            } catch (error) {
                res.status(500).send({ status: "error", message: "Error en el servidor" });
            }
        }) 
    }

    async faillogin (req, res) {
        try {
            res.send({error: "error al loguear"})
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });

        }
    }

    async logout (req, res) {
        try {
            if (req.session.login) {
                req.session.destroy()
             }
             res.redirect("/login")
        } catch (error) {
            res.status(500).send({ status: "error", message: "Error en el servidor" });
 
        }
    }
}

export default sessionController