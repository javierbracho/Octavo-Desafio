import express from "express";
import UserController from "../controllers/user.controller.js";
import validation from "../middleware/validation.js";

const Validation = new validation()

const router = express.Router();
const userController = new UserController();

router.post("/", userController.userRegister);
router.get("/failedregister", userController.failedRegister);
router.get("/show", Validation.admin, userController.getUsers)
router.delete("/delete", Validation.admin, userController.deleteUsers)


export default router;


