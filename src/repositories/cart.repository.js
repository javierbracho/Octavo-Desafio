import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"
import productRepository from "./product.repository.js"
import userModel from "../models/user.model.js"
import ticketModel from "../models/ticket.model.js"
import cartUtils from "../utils/cartUtils.js";
import EmailManager from "../services/email.js";

const emailManager = new EmailManager()


const {generateUniqueCode, calcularTotal} = cartUtils



const ProductRepository = new productRepository()


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

    async addProduct(cartId, productId, quantity = 1, role, email) {
        try {
            const cart = await this.getCartById(cartId);
            const product = await productModel.findById(productId);
    
            if (!product) {
                return { error: "Producto no encontrado" };
            }
    
            if (role === "premium" || product.owner === email) {
                return { error: "No puedes agregar al carrito tu propio producto" };
            }
    
            if (product.stock === 0) {
                return { error: "Producto sin stock disponible" };
            }
    
            const productExist = cart.products.find(item => item.product._id.toString() === productId);
            let message = null;
    
            if (productExist) {
                const totalQuantity = productExist.quantity + quantity;
                if (totalQuantity > product.stock) {
                    const addedQuantity = product.stock - productExist.quantity;
                    productExist.quantity = product.stock; 
                    message = `Solo se agregaron ${addedQuantity} unidades debido a disponibilidad limitada.`;
                } else {
                    productExist.quantity = totalQuantity;
                }
            } else {
                if (quantity > product.stock) {
                    quantity = product.stock; 
                    message = `Solo se agregaron ${quantity} unidades debido a disponibilidad limitada.`;
                }
                cart.products.push({ product: productId, quantity });
            }
    
            cart.markModified("products");
            await cart.save();
    
            return { cart, message };
    
        } catch (error) {
            console.log("Error al agregar productos", error);
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

    async checkout(cartId) {
        try {
            const cart = await this.getCartById(cartId);
            const products = cart.products;
    
            const withoutStock = [];
            const purchasedProducts = [];
    
            for (const item of products) {
                const productId = item.product;
                const product = await ProductRepository.getProductById(productId);
    
                let quantityToPurchase = item.quantity;
                if (product.stock < item.quantity) {
                    quantityToPurchase = product.stock; // Limitar la compra al stock disponible
                }
    
                if (quantityToPurchase > 0) {
                    // Actualizar stock del producto
                    product.stock -= quantityToPurchase;
                    await product.save();
    
                    // Agregar producto al ticket de compra con la cantidad efectivamente comprada
                    purchasedProducts.push({
                        product: productId,
                        quantity: quantityToPurchase
                    });
    
                    // Actualizar la cantidad restante en el carrito
                    item.quantity -= quantityToPurchase;
                }
    
                // Si no hay suficiente stock para la cantidad deseada, agregar al array withoutStock
                if (quantityToPurchase < item.quantity) {
                    withoutStock.push(productId);
                }
            }
    
            const userCart = await userModel.findOne({ cart: cartId });
    
            // Crear ticket solo con productos comprados
            const ticket = new ticketModel({
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: calcularTotal(purchasedProducts), // Calcular total basado en productos comprados
                purchaser: userCart._id
            });
            await ticket.save();
    
            // Filtrar carrito para eliminar productos comprados y actualizar cantidades restantes
            cart.products = cart.products.filter(item => item.quantity > 0);
            await cart.save();
    
            // Enviar confirmación por correo electrónico
            await emailManager.buyConfirmation(userCart.email, userCart.first_name, ticket.code);
    
            return ticket;
        } catch (error) {
            console.log("Error al realizar la compra", error);
            throw error;
        }
    }
    
    
}
export default CartRepository