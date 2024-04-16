import  Express  from "express";
import viewsController from "../controllers/views.controller.js";

const ViewsController = new viewsController()
const router = Express.Router()

router.get("/", ViewsController.cargarHome)
router.get("/register", ViewsController.register)

export default router