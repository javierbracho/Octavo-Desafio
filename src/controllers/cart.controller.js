import cartRepository from "../repositories/cart.repository.js";

const CartRepository = new cartRepository()

class cartController {
    async newCart (req,res) {
        try {
            const newCart = await CartRepository.cartCreate()
            res.json(newCart)
        } catch (error) {
            res.status(500).json("Error en el servidor");
            console.log("error al crear carrito", error)
        }
    }

    async getCart (req,res) {
        const cartId = req.params.cid
        try {
            const products = await CartRepository.getCartById(cartId)
            res.json(products)
        } catch (error) {
            res.status(500).json("Error en el servidor");
            console.log("error al crear carrito", error)
 
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
            console.log("error al agregar producto al carrito", error)
            
        }
    }
    //  const userCart = (req.user.cart).toString()

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
            console.log("error al borrar producto del carrito", error)

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
            console.log("error al actualizar cantidades de producto para el carrito", error)

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
            console.log("error al actualizar productos para el carrito", error)

        }
    }

    async emptyCart (req, res) {
        const cartId = req.params.cid
        try {
            const cart = await CartRepository.emptyCart(cartId)
            res.json({
                Status: "Sucess",
                Message: "Carrito vaciado exitosamente",
                cart
            })

        } catch (error) {
            res.status(500).json("Error en el servidor");
            console.log("error al vaciar carrito", error)

        }
    }
}

export default cartController