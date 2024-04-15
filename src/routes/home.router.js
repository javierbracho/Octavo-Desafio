import  Express  from "express";
import HomeController from "../controllers/home.controller.js";

const homeController = new HomeController()
const router = Express.Router()

router.get("/", homeController.cargarHome)

export default router