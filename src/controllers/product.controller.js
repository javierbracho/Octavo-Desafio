import ProductRepository from "../repositories/product.repository.js"

const productRepository = new ProductRepository()

class ProductController {
    async getProducts (req, res) {
        try {
            const products = await productRepository.traerTodo();
            res.render("products")
        } catch (error) {
            res.status(500).json("Error en el servidor")
        }
    }

    async postProducts (req, res) {
        const newProduct = req.body;
        try {
            await productRepository.crear(productoInfo)
            res.status(200).send("Producto creado")
        } catch (error) {
            res.status(500).json("Error en el servidor")

        }
    }
}

export default ProductController