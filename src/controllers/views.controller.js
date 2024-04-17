class ViewsController {
    async cargarHome (req, res) {
        try {
            res.render("home")

        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }

    async register ( req, res) {
        try {
      if (req.session && req.session.login) {
            return res.redirect("/products");           
         }
            res.render("register")
    
        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }

    async cargarProducts ( req, res, next) {
        try {
            if (req.session && req.session.login) {
                next ()
            } else {
                res.redirect("/home")

            }
        } catch (error) {
            
        }
    }


}

export default ViewsController