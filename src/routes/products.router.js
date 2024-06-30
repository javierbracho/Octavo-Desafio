import Express  from "express";
import ProductController from "../controllers/product.controller.js";
import validation from "../middleware/validation.js";

const Validation = new validation()
const productController = new ProductController()
const router = Express.Router()

router.get("/", Validation.user, productController.getProducts)
router.post ("/", productController.postProducts)
router.delete("/:pid", productController.DeleteProduct)
router.get("/:pid", productController.GetProductById)
router.put("/:pid", productController.UpdateProduct)

export default router