import productModel from "../models/product.model.js"

class ProductRepository {
    async getProducts(options) {
        try {
            const { sort, category, limit, page } = options;
            const query = {};
            if (category) {
                query.category = category;
            }
            let sortOptions = {};
            if (sort === 'asc') {
                sortOptions = { price: 1 };
            } else if (sort === 'desc') {
                sortOptions = { price: -1 };
            }
            const paginationOptions = {
                sort: sortOptions,
                limit: parseInt(limit) || 10,
                page: parseInt(page) || 1
            };
            const products = await productModel.paginate(query, paginationOptions);
            return products;
        } catch (error) {
            throw new Error("Error al obtener automoviles");
        }
    }

    async addProduct({title, description, price, thumbnail, code, stock, category, details})
    {
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock|| !details) {
                console.log ("Debes ingregar todos los campos")
                return
            }
            
            const existeProducto = await productModel.findOne({code: code})
            
            if (existeProducto) {
                console.log("el código debe ser único")
                return
            }
            const nuevoProducto = new productModel ({
                title,
                description,
                price,
                thumbnail: "sin imagen",
                code,
                stock,
                status: true,
                category,
                details
                
            });

            await nuevoProducto.save()
                 
        }  catch (error) {
            throw new Error("Error al crear automóvil:" + error);
        }
    }
    async deleteProduct (id) {
        try {
            const deleteProduct = await productModel.findByIdAndDelete(id)
                if(!deleteProduct){
                    console.log("No se encontró producto por el ID")
                    return null
                }
                console.log("Producto eliminado")
        } catch (error) {
            res.status(500).json("Error en el servidor")
            console.log("error al eliminar producto", error)
        }
    }

    async getProductById (id) {
        try {
            const getProductById = await productModel.findById(id)
                if (!getProductById) {
                    console.log ("No se encontro producto por el ID")
                    return null
                }
                return getProductById
        } catch (error) {
            res.status(500).json("Error en el servidor")
            console.log("error al encontrar producto", error)

        }
    }

    async updateProduct (id , productoActualizado) {
        try {
            const updateProduct = await productModel.findByIdAndUpdate(id, productoActualizado)
                if (!updateProduct) {
                    console.log("No se encontro producto por el ID")
                    return null
                }
                console.log("Producto actualizado")
        } catch (error) {
            
        }
    }

}

export default ProductRepository