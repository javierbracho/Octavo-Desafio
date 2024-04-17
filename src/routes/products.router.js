import Express  from "express";
import ProductController from "../controllers/product.controller.js";
import viewsController from "../controllers/views.controller.js";

const ViewsController = new viewsController()
const productController = new ProductController()
const router = Express.Router()

router.get("/", ViewsController.cargarProducts, productController.getProducts)
router.post ("/", productController.postProducts)
router.delete("/:pid", productController.DeleteProduct)
router.get("/:pid", productController.GetProductById)
router.put("/:pid", productController.UpdateProduct)

export default router