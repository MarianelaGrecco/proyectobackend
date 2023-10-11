import productsModel  from "../../mongoDB/models/products.model.js";
import BasicMongo from "./basicMongo.js";


class ProductsMongo extends BasicMongo{
    constructor(model){
        super(model)
      }

      async findAllProducts() {
        try {
          const products = await this.findAll();
          return products;
        } catch (error) {
          throw error;
        }
      }
    }


export const productsMongo = new ProductsMongo(productsModel)