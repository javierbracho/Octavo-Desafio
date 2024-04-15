class HomeController {
    async cargarHome (req, res) {
        try {
            res.render("home")

        } catch (error) {
            res.status(500).json("Error en el servidor");

        }
    }
}

export default HomeController