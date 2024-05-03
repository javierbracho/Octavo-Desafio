import Express from "express";
import getProducts from "../controllers/faker.controller.js";

const router = Express.Router();

router.get("/", getProducts);

export default router;