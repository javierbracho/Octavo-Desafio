import  Express  from "express";
import SessionController from "../controllers/session.controller.js";
import validation from "../middleware/validation.js";

const Validation = new validation()

const router = Express.Router();
const sessionController = new SessionController()

router.post("/login", sessionController.login)
router.get("/faillogin", sessionController.faillogin)
router.get("/logout", sessionController.logout)
router.post("/requestpasswordreset", sessionController.requestPasswordReset)
router.post("/reset-password", sessionController.resetPassword)
router.put("/premium/:uid", sessionController.changeRole)
router.post("/:uid/documents", sessionController.uploadDocuments)
router.get("/upgradeaccount", Validation.user,  sessionController.upgradeAccount)

export default router