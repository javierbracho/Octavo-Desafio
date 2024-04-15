import Express  from "express";
import database from "../src/database.js"
import productsRouter from "./routes/products.router.js"
import  ExpressHandlebars  from "express-handlebars";
import homeRouter from "./routes/home.router.js"

const app = Express ();
const PUERTO = 8080

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use(Express.static("./src/public"))

app.engine("handlebars", ExpressHandlebars.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/products", productsRouter)
app.use("/api/products", productsRouter)
app.use("/home", homeRouter)


app.listen(PUERTO, () =>{
    console.log("Escuchando en el puerto 8080")
})