import userDto from "../dto/user.dto.js";


class ViewsController {
    async cargarHome(req, res) {
        let cartId;
        try {
            if (req.session && req.session.login) {
                cartId = req.session.user.cartId._id; 
            }
            res.render("home", { cartId });
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

    async chat(req, res, next) {
        try {
            res.render("chat")
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json("Error en el servidor");
        }
    }

    async profile(req, res) {
        try {
            if (req.session && req.session.login) {
                const cartId = req.session.user.cartId;
    
                const userSessionDto = new userDto(
                    req.session.user.first_name,
                    req.session.user.last_name,
                    req.session.user.email,
                    req.session.user.role,
                    cartId._id ? cartId._id : cartId
                );
    
                console.log('Datos de la sesión:', req.session.user);
                res.render("profile", { userDto: userSessionDto });
            } else {
                res.redirect("/login");
            }
        } catch (error) {
            console.error('Error al cargar el perfil:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async realtime(req, res) {
        try {
            res.render("realtime", { role: req.session.user.role, email: req.session.user.email });
        } catch (error) {
            console.error('Error al cargar realtime:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }


    async renderResetPassword(req, res) {
        res.render("passwordreset");
    }

    async renderCambioPassword(req, res) {
        res.render("formulario-Cambio-Password");
    }

    async renderConfirmacion(req, res) {
        res.render("confirmacion-Request-Password");
    }
}

export default ViewsController