import productModel from "../models/product.model.js"
import customError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enums.js"
import {generateProductsErrorInfo , generateProductsErrorCode}  from "../services/errors/info.js"

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

    async addProduct({title, description, price, thumbnail, code, stock, category, details, owner})
    {
        try {
            if(!title || !description || !price || !thumbnail || !code || !stock|| !category || !details ) {
                throw customError.createError({
                    nombre: "nuevo producto",
                    causa: generateProductsErrorInfo({title, description, price, code, stock, details , category}),
                    mensaje: "Error al crear un nuevo producto por falta o uso incorrecto al ingresar datos",
                    codigo: EErrors.TIPO_INVALIDO
                })
            }
            
            const existeProducto = await productModel.findOne({code: code})
            
            if (existeProducto) {
                throw customError.createError({
                    nombre: "Codigo en uso, modificar",
                    causa: generateProductsErrorCode({code}),
                    mensaje: "Error al crear un nuevo producto por ingresar codigo que actualmente esta en uso",
                    codigo: EErrors.TIPO_INVALIDO
                })
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
                details,
                owner
                
            });

            await nuevoProducto.save()
                 
        }  catch (error) {
            throw error;
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
            res.status(500).json("Error en el servidor")
            console.log("error al encontrar producto", error)

        }
    }

}

export default ProductRepository