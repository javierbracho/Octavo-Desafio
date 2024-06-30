import Express from "express";
import CartController from "../controllers/cart.controller.js"
import validation from "../middleware/validation.js";

const Validation = new validation()
const router = Express.Router()
const cartController = new CartController ()

router.post("/", cartController.newCart)
router.get("/:cid", Validation.user, cartController.getCart)
router.post("/:cid/product/:pid", cartController.addProduct)
router.delete("/:cid/product/:pid", cartController.deleteProduct)
router.put("/:cid/product/:pid", cartController.updateQuantity)
router.delete("/:cid", cartController.emptyCart)
router.post("/:cid/purchase", cartController.checkout)

export default router
