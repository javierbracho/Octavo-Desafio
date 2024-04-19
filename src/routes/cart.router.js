import Express from "express";
import CartController from "../controllers/cart.controller.js"

const router = Express.Router()
const cartController = new CartController ()

router.post("/", cartController.newCart)
router.get("/:cid", cartController.getCart)
router.post("/:cid/product/:pid", cartController.addProduct)
router.delete("/:cid/product/:pid", cartController.deleteProduct)
router.put("/:cid/product/:pid", cartController.updateQuantity)
router.delete("/:cid", cartController.emptyCart)

export default router
