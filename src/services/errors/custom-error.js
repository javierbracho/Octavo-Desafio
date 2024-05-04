class customError {
    static createError({nombre = "error", causa = "desconocido", mensaje, codigo = 1}){
        const error = new Error (mensaje);
        error.name = nombre,
        error.cause = causa,
        error.code = codigo
        throw error
    }
}
export default customError