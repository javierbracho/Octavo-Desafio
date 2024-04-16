import  Express  from "express";
import viewsController from "../controllers/views.controller.js";

const ViewsController = new viewsController()
const router = Express.Router()

router.get("/", ViewsController.cargarHome)
router.get("/register", ViewsController.register)

router.get('/test', (req, res) => {
    console.log(req.session);
    res.send('¡Prueba exitosa!');
});

export default router