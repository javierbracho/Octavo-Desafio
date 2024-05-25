import Express  from "express";
import compression from "express-compression";
import database from "../src/database.js"
import productsRouter from "./routes/products.router.js"
import  ExpressHandlebars  from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import configObject from "./config/config.js";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.router.js"
import sessionRouter from "./routes/session.router.js"
import cartRouter from "./routes/cart.router.js"
import SocketManager from "./sockets/socketmanager.js";
import helper from "./utils/handlebarsHelper.js"
import mockingRouter from "./routes/faker.router.js";
import manejadorErrores from "./middleware/error.js";
import loggerRouter from "./routes/loggertest.router.js"
import {logger, addLogger} from "./utils/logger.js"
import { SwaggerUi, swaggerSpecs } from "./config/swagger.js";

//Constantes
//conexion puerto
const app = Express ();
const PUERTO = 8080

//Variable de entorno
const {mongo_url, mongo_pass} = configObject

// middleware
app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use(Express.static("./src/public"))
app.use(cookieParser())
app.use(compression())
app.use(addLogger)

//Cargar session
app.use(session ({
    secret: mongo_pass,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongo_url,
        ttl: 100
    })
}))

//handlebars
app.engine("handlebars", ExpressHandlebars.engine({
    helpers:{
        ifEqual: helper
    }
}))
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//cargar la ruta de router
app.use("/", viewsRouter)
app.use("/products", productsRouter)
app.use("/api/products", productsRouter)
app.use("/user", userRouter)
app.use("/session", sessionRouter)
app.use("/api/carts", cartRouter)
app.use("/mockingproducts", mockingRouter)
app.use(manejadorErrores)
app.use("/loggertest", loggerRouter)
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpecs))



//Iniciar passport
initializePassport()
app.use(passport.initialize())

//Activar conexion
const HttpServer = app.listen(PUERTO, () => {
    logger.info(`Servidor escuchando en http://localhost:${PUERTO}`);
});

new SocketManager(HttpServer)