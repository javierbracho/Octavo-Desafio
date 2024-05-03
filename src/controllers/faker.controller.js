import generateProducts from "../utils/faker.js";

const getProducts = (req, res) => {
    const productsFake = [];
    for (let i = 0; i < 100; i++) {
        productsFake.push(generateProducts());
    }
    res.json(productsFake);
};

export default getProducts;
