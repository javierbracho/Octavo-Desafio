import loggertestController from "../controllers/logger.controller.js";
import Express  from "express";

const router = Express.Router();

router.get("/", loggertestController);

export default router;