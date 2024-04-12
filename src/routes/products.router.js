import Express  from "express";
import ProductController from "../controllers/product.controller.js";

const productController = new ProductController()
const router = Express.Router()

router.get("/", productController.getProducts)
router.post ("/", productController.postProducts)

export default router