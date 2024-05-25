import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

const swaggerOptions =  {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de la aplicacion Peugeot",
            description: "Aplicacion web de un concesionario de autos, marca Peugeot",
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)

export {SwaggerUi, swaggerSpecs}

