import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();
const userController = new UserController();

router.post("/", userController.userRegister);
router.get("/failedregister", userController.failedRegister);
router.get("/show", userController.getUsers)
router.delete("/delete", userController.deleteUsers)


export default router;


