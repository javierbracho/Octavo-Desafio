import  Express  from "express";
import generateProducts from "../utils/faker.js"

const router = Express.Router()

router.get("/", (req, res) => {
    const productsFake = []
    for (let i= 0; i < 100; i++) {
        productsFake.push(generateProducts())
    }
    res.json(productsFake)

})

export default router