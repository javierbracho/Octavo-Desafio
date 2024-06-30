class validation {
    async user ( req, res, next) {
        try {
            if (req.session && req.session.user) {
                if (req.session.user.role === "user" || req.session.user.role === "premium") {
                    next ()
                } else {
                    res.status(403).send("Sin autorización, debes iniciar sesión como usuario");
                }
            } else {
                res.status(401).send("Sin autorización, debes iniciar sesión");
            }
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json("Error en el servidor");

        }
    }
    async admin ( req, res, next) {
        try {
            if (req.session && req.session.user) {
                if (req.session.user.role === "admin") {
                    next ()
                } else {
                    res.status(403).send("Sin autorización, debes iniciar sesión como admin");
                }
            } else {
                res.status(401).send("Sin autorización, debes iniciar sesión");
            }
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json("Error en el servidor");

        }
    }
    async premiumOrAdmin ( req, res, next) {
        try {
            if (req.session && req.session.user) {
                if(req.session.user.role === "admin" || req.session.user.role === "premium"){
                    next ()
                } else {
                    res.status(403).send("Sin autorización, debes iniciar sesión como admin o premium");
                }
            } else {
                res.status(401).send("Sin autorización, debes iniciar sesión");
            }
        } catch (error) {
            console.error("Error en el middleware de autorización:", error);
            res.status(500).json("Error en el servidor");

        }

    }
}

export default validation