import cartRepository from "../repositories/cart.repository.js";
import productRepository from "../repositories/product.repository.js"
import userModel from "../models/user.model.js"
import ticketModel from "../models/ticket.model.js"
import cartUtils from "../utils/cartUtils.js";
import {logger} from "../utils/logger.js"

const {generateUniqueCode, calcularTotal} = cartUtils

const CartRepository = new cartRepository()
const ProductRepository = new productRepository()

class cartController {
    async newCart (req,res) {
        try {
            const newCart = await CartRepository.cartCreate()
            res.json(newCart)
        } catch (error) {
            res.status(500).json("Error en el servidor");
            logger.fatal("error al crear carrito", error)
        }
    }

    async getCart (req,res) {
        const cartId = req.params.cid
        try {
            const products = await CartRepository.getCartById(cartId)
            
            const finalProducts = products.products.map(item => {
                const { product, quantity } = item;
                return {
                    productId: product._id.toString(),
                    productName: product.title,
                    price: product.price,
                    quantity: quantity,
                    cartId: cartId
                };
            });

            res.render("cart",{
                products: finalProducts,
                cartId: cartId
            })
            
        } catch (error) {
            res.status(500).json("Error en el servidor");
            logger.error("error al crear carrito", error)
        }
    }

    async addProduct ( req, res) {
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body.quantity || 1
        try {
            await CartRepository.addProduct(cartId, productId, quantity)
            res.send("Producto agregado")
            
        } catch (error) {
            res.status(500).json("Error en el servidor");
            logger.warning("error al agregar producto al carrito", error)
            
        }
    }
    async deleteProduct (req, res) {
        const cartId = req.params.cid
        const productId = req.params.pid
        try {
            const cart = await CartRepository.deleteProduct(cartId, productId)
            res.json({
                Status: "Sucess",
                Message: "Producto eliminado exitosamente",
                cart
            })
        } catch (error) {
            res.status(500).json("Error en el servidor");
            logger.warning("error al borrar producto del carrito", error)

        }
    }

    async updateQuantity (req, res) {
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body.quantity
        try {
            const cart = await CartRepository.updateQuantity(cartId, productId, quantity)
            res.json({
                Status: "Sucess",
                Message: "Cantidades actualizadas exitosamente",
                cart
            })
        } catch (error) {
            res.status(500).json("Error en el servidor");
            logger.warning("error al actualizar cantidades de producto para el carrito", error)

        }
    }

    async updateProduct (req, res) {
        const cartId = req.params.cid
        const updateProducts = req.body
        try {
            const cart = await CartRepository.updateProducts(cartId, updateProducts)
            res.json({
                Status: "Sucess",
                Message: "Productos actualizados exitosamente",
                cart
            })
            
        } catch (error) {
            res.status(500).json("Error en el servidor");
            logger.warning("error al actualizar productos para el carrito", error)

        }
    }

    async emptyCart (req, res) {
        const cartId = req.params.cid
        try {
            const cart = await CartRepository.emptyCart(cartId)
            res.json({
                Status: "Success",
                Message: "Carrito vaciado exitosamente",
                cart
            })

        } catch (error) {
            res.status(500).json("Error en el servidor");
            console.log("error al vaciar carrito", error)

        }
    }

    async checkout (req, res) {
        const cartId = req.params.cid
        try {
            const cart = await CartRepository.getCartById(cartId)
            const products = cart.products

            const withoutStock = []
            for (const item of products) {
                const productId = item.product
                const product = await ProductRepository.getProductById(productId)
                if(product.stock >= item.quantity) {
                    product.stock -= item.quantity
                    await product.save()
                } else {
                    withoutStock.push(productId)
                }
            }

            const userCart = await userModel.findOne({cart: cartId})

            const ticket = new ticketModel({
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: calcularTotal(cart.products),
                purchaser: userCart._id
            })
            await ticket.save()
            cart.products = cart.products.filter(item => withoutStock.some(productId => productId.equals(item.product)));
            await cart.save()

            res.status(200).json({ ticket }); // agregar renderizado de vista y enviar correo con la compra

        } catch (error) {
            logger.warning('Error al procesar la compra:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } 
}

export default cartController