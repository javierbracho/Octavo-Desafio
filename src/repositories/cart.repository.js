import cartModel from "../models/cart.model.js"

class CartRepository {
    async cartCreate () {
        try {
            const newCart = new cartModel({ products: [] })
            await newCart.save ()
            return newCart
        } catch (error) {
            console.log("error al crear carrito", error)
        }
    }

    async getCartById (cartId) {
        try {
            const cart = await cartModel.findById(cartId)
                if(!cart) {
                    console.log("No existe el carrito")
                    return null
                }
            return cart

        } catch (error) {
            console.log("error al encontrar producto", error)

        }
    }

    async addProduct (cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId)
            const productExist = cart.products.find(item => item.product._id.toString()===productId)
                if (productExist) {
                    productExist.quantity += quantity;
                } else {
                    cart.products.push({ product: productId, quantity });
                }

                cart.markModified("products")
                await cart.save()
                return cart

        } catch (error) {
            console.log("error al agregar productos", error)
            throw error;
        }
    }

    async deleteProduct (cartId, productId, ) {
        try {
            const cart = await this.getCartById(cartId)
                if(!cart) {
                    throw new Error ("Carrito no encontrado")
                }
            cart.products = cart.products.filter(item => item.product._id.toString() !== productId) 
            await cart.save()
            return cart

        } catch (error) {
            console.log("error al eliminar productos", error)

        }
    }

    async updateProducts (cartId, updatedProducts) {
        try {
            const cart = await this.getCartById(cartId)
                if(!cart) {
                    throw new Error ("Carrito no encontrado")
                }
                cart.products = updatedProducts
                cart.markModified("products")
                await cart.save()
                return cart


        } catch (error) {
            console.log("error al actualizar productos", error)

        }
    }

    async updateQuantity (cartId, productId, newQuantity) {
        try {
            const cart = await this.getCartById(cartId)
            if(!cart) {
                throw new Error ("Carrito no encontrado")
            }
            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId)
                if(productIndex !== -1){
                    cart.products[productIndex].quantity = newQuantity
                }
                cart.markModified("products")
                await cart.save()
                return cart
        } catch (error) {
            console.log("error al actualizar cantidades", error)

        }
    }

    async emptyCart (cartId) {
        try {
            const cart = await cartModel.findByIdAndUpdate(
                cartId,
                { products: [] },
                { new: true },
            )   
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            return cart
            
        } catch (error) {
            console.log("error al vaciar carrito", error)

        }
    }
}
export default CartRepository