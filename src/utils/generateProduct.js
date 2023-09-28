import { fakerES } from "@faker-js/faker";



export const generateProduct = () => {
  return {
    title: fakerES.commerce.productName(),
    type: fakerES.commerce.productAdjective(),
    description: fakerES.commerce.productDescription(),
    category: fakerES.commerce.department(),
    price: fakerES.commerce.price(),
    stock:10,
    id:fakerES.database.mongodbObjectId(),
    image:fakerES.image.urlPicsumPhotos
  };
};


let products = [];
const numOfProducts = 100;

for (let i = 0; i < numOfProducts; i++) {
  products.push(generateProduct());
}

export default products;
