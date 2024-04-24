import  Express  from "express";
import viewsController from "../controllers/views.controller.js";

const ViewsController = new viewsController()
const router = Express.Router()

router.get("/", ViewsController.cargarHome)
router.get("/login", ViewsController.login)
router.get("/register", ViewsController.register)
router.get("/chat", ViewsController.chat)
router.get("/profile", ViewsController.profile)
router.get("/realtime", ViewsController.realtime)


export default router