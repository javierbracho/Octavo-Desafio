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

//Constantes
//conexion puerto
const app = Express ();
const PUERTO = 8080

//Variable de entorno
const {mongo_url} = configObject

// middleware
app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use(Express.static("./src/public"))
app.use(cookieParser())

//handlebars
app.engine("handlebars", ExpressHandlebars.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//cargar la ruta de router
app.use("/products", productsRouter)
app.use("/api/products", productsRouter)
app.use("/home", viewsRouter) // cambiar direcciones para que sea mas legible
app.use("/user", userRouter)

//Cargar session
app.use(session ({
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongo_url,
        ttl: 100
    })
}))

//Iniciar passport
initializePassport()
app.use(passport.initialize())

//Activar conexion
app.listen(PUERTO, () =>{
    console.log("Escuchando en el puerto 8080")
})