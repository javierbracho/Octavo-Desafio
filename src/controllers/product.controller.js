import productModel from "../models/product.model.js";
import ProductRepository from "../repositories/product.repository.js"

const productRepository = new ProductRepository();

class ProductController {
    async getProducts(req, res) {
        try {
            const options = {
                sort: req.query.sort || '',
                category: req.query.category || '',
                limit: parseInt(req.query.limit) || 10,
                page: parseInt(req.query.page) || 1
            };
            const carritoId = req.session.user.cartId ? req.session.user.cartId._id : null;
            const products = await productRepository.getProducts(options);
            const finalProducts = products.docs.map(product => {
                const { _id, ...rest } = product.toObject();
                return { ...rest, _id: _id.toString(), cartId: carritoId };
            });
            
            res.render("products", {
                status: "success",
                payload: finalProducts,
                totalPages: products.totalPages,
                prevPages: products.prevPages,
                nextPages: products.nextPages,
                pages: products.page,
                hasPrevPages: products.hasPrevPage,
                hasNextPages: products.hasNextPage,
                prevLink: products.prevPage,
                nextLink: products.nextPage,
                limit: products.limit,
                cartId: carritoId
            });
        } catch (error) {
            res.status(500).json("Error en el servidor");
            console.log("error al cargar producto", error)
        }
    }

    async postProducts (req, res) {
        const newProduct = req.body;
        try {
            await productRepository.addProduct(newProduct)
            res.status(200).send("Producto creado")
        } catch (error) {
            res.status(500).json("Error en el servidor")
            console.log("error al agregar producto", error)

        }
    }

    async DeleteProduct (req, res) {
        let id = req.params.pid 
        try {
            await productRepository.deleteProduct(id)
            res.json({message: "Producto eliminado de forma correcta"})
        } catch (error) {
            res.status(500).json("Error en el servidor")
            console.log("error al eliminar producto", error)
        }
    }

    async GetProductById (req, res) {
        let id = req.params.pid
        try {
            const producto = await productRepository.getProductById(id)
                if(!producto) {
                    res.json({error: "producto no encontrado"})
                } else {
                    res.json(producto)
                } 
        } catch (error) {
            res.status(500).json("Error en el servidor")
            console.log("error al eliminar producto", error)
        }
    }

    async UpdateProduct (req, res) {
        let id = req.params.pid;
        const productoActualizado = req.body
        try {
            await productRepository.updateProduct(id ,productoActualizado)
            res.json({message:"Producto actualizado de manera correcta"})
        } catch (error) {
            res.status(500).json("Error en el servidor")
            console.log("error al actualizar producto", error)

        }
    }


}

export default ProductController