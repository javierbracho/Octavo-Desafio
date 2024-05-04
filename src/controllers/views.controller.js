import userDto from "../dto/user.dto.js";


class ViewsController {
    async cargarHome (req, res) {
        try {
            res.render("home")

        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }

    async login (req, res) {
        try {
            if(req.session && req.session.login) {
                return res.redirect("/profile")
            }
            res.render("login")
 
        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }

    async register ( req, res) {
        try {
            if (req.session && req.session.login) {
                return res.redirect("/login");           
         }
            res.render("register")
    
        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }

    async cargarProducts ( req, res, next) {
        try {
            if (req.session && req.session.user && req.session.user.role === "user") {
                next ()
            } else {
                res.send("Sin autorizacion, debes iniciar sesion como USUARIO")

            }
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json("Error en el servidor");

        }
    }

    async cargarCart ( req, res, next) {
        try {
            if (req.session && req.session.user && req.session.user.role === "user") {
                next ()
            } else {
                res.send("Sin autorizacion, debes iniciar sesion como USUARIO")

            }
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json("Error en el servidor");

        }
    }

    async chat(req, res) {
        try {
            if (req.session && req.session.user && req.session.user.role === "user") {
                res.render("chat")
            } else {
                res.send("Sin autorización, debes iniciar sesión como USUARIO");
            }
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json("Error en el servidor");
        }
    }

async profile(req, res) {
    try {
        if (req.session && req.session.login) {
            const userSessionDto = new userDto(
                req.session.user.first_name,
                req.session.user.last_name,
                req.session.user.email,
                req.session.user.role,
                req.session.user.cartId._id
            );

            console.log(req.session.user)
            res.render("profile", { userDto: userSessionDto });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

    async realtime ( req,res ) {
        try {
            if(req.session && req.session.login){
                if(req.session.user.role === "admin"){
                    res.render("realtime")
                    
                } else {
                    res.send("No tienes permiso")
                }
            } else {
                res.redirect("/login")
            }
        } catch (error) {
            console.error('Error al cargar realtime:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
    
        }
    }

}

export default ViewsController