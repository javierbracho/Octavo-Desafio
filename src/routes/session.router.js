import  Express  from "express";
import SessionController from "../controllers/session.controller.js";

const router = Express.Router();
const sessionController = new SessionController()

router.post("/login", sessionController.login)
router.get("/faillogin", sessionController.faillogin)
router.get("/logout", sessionController.logout)

export default router