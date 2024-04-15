import Express  from "express";
import ProductController from "../controllers/product.controller.js";

const productController = new ProductController()
const router = Express.Router()

router.get("/", productController.getProducts)
router.post ("/", productController.postProducts)
router.delete("/:pid", productController.DeleteProduct)
router.get("/:pid", productController.GetProductById)
router.put("/:pid", productController.UpdateProduct)

export default router