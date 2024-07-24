import cartRepository from "../repositories/cart.repository.js";
import productRepository from "../repositories/product.repository.js"
import {logger} from "../utils/logger.js"


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
            logger.error("error al obtener carrito", error)
        }
    }

    async addProduct(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;
        const role = req.session.user.role;
        const email = req.session.user.email;
    
        try {
            
            const result = await CartRepository.addProduct(cartId, productId, quantity, role, email);
    
            if (result.error) {
                return res.status(400).json({ message: result.error, type: 'error' });
            }
    
            if (result.message) {
                return res.status(200).json({ message: result.message, type: 'info' });
            }
    
            return res.status(200).json({ message: 'Producto agregado correctamente', type: 'success' });
        } catch (error) {
            logger.warning("Error al agregar producto al carrito", error);
            return res.status(500).json({ message: 'Error en el servidor', type: 'error' });
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

    async checkout(req, res) {
        const cartId = req.params.cid;
        try {
            const ticket = await CartRepository.checkout(cartId);
            const checkoutTicket = ticket.toObject();
    
            res.render('checkout', { ticket: checkoutTicket });
        } catch (error) {
            logger.warning('Error al procesar la compra:', error);
            res.status(500).render('error', { error: 'Error interno del servidor' });
        }
    }
}

export default cartController