import productModel from "../models/product.model.js"

class ProductRepository {
    async traerTodo () {
        try {
            const products = await productModel.find();
            return products
        } catch (error) {
            throw new Error ("Error al obtener automoviles") 
        }
    }

    async crear (productoInfo) {
        try {
            return await productModel.create(productoInfo)
        } catch (error) {
            throw new Error ("Error al crear automovil")
        }
    }
}

export default ProductRepository