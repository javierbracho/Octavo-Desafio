import Express  from "express";
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



//Iniciar passport
initializePassport()
app.use(passport.initialize())

//Activar conexion
const HttpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
  });

new SocketManager(HttpServer)