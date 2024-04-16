class ViewsController {
    async cargarHome (req, res) {
        try {
            res.render("home")

        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }

    //pendiente que no carga ya que aun no tenemos session
    async register ( req, res) {
        try {
            if(req.session.login) {
                return res.redirect("products")
            }
            res.render("register")
    
        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }


}

export default ViewsController