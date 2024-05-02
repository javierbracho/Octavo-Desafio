import { faker } from "@faker-js/faker";

const generateProducts = () => {
    return {
        id : faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(640, 480, 'product')        
    }
}

export default generateProducts