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
            if (req.session && req.session.user.role === "user") {
                next ()
            } else {
                res.send("Sin autorizacion, debes iniciar sesion como USUARIO")

            }
        } catch (error) {
            
        }
    }

    async cargarCart ( req, res, next) {
        try {
            if (req.session && req.session.user.role === "user") {
                next ()
            } else {
                res.send("Sin autorizacion, debes iniciar sesion como USUARIO")

            }
        } catch (error) {
            
        }
    }

    async chat (req, res) {
        try {
            if (req.session && req.session.user.role === "user") {
                next ()
            } else {
                res.send("Sin autorizacion, debes iniciar sesion como USUARIO")

            }

        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }

    async profile (req, res) {
        try {
            if(req.session && req.session.login) {
                res.render("profile", {
                    firstName: req.session.user.first_name,
                    lastName: req.session.user.last_name,
                    email: req.session.user.email,
                    cartId: req.session.user.cartId._id,
                    role: req.session.user.role
                })
                console.log(req.session.user)
            } else {
                res.redirect("/login")
            }
        } catch (error) {
            
        }
    }

    async realtime ( req,res ) {
        try {
            if(req.session && req.session.user.role === "admin"){
                res.render("realtime")
            } else {
                res.send("No tienes permiso")
            }
        } catch (error) {
            
        }
    }

}

export default ViewsController