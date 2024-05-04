const generateProductsErrorInfo = (product) => {
    return `Los datos ingresados estan incompletos o no son validos
    Necesitamos recibir los siguientes datos de manera correcta:
    -title: Debe ser un string, pero recibimos: ${product.title}
    -description: Debe ser un string, pero recibimos: ${product.description}
    -price: Debe ser un number, pero recibimos: ${product.price}
    -code: Debe ser un string y único, pero recibibmos ${product.code} 
    -stock: Debe ser un number, pero recibimos ${product.stock}
    - details: Debe ser un string, pero recibimos ${product.details}
    -category: Debe ser un string, pero recibimos ${product.category}`
}

export default generateProductsErrorInfo