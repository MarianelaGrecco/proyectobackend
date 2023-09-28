import { productsMongo } from "../persistencia/DAOs/MongoDAOs/productsMongo.js";

class ProductsService {
  async findAllProducts() {
    try {
      const products = await productsMongo.findAll();
      return products;
    } catch (error) {
      return error;
    }
  }

  async findOneProduct(id) {
    try {
      const product = await productsMongo.findOneById(id);
      return product;
    } catch (error) {
      return  error;
    }
  }

  async showProductDetails () {
    try{
      const productDetails = await productsMongo.findOne ({cid,pid})
      return productDetails
    }catch (error) {
      throw new Error("Error al buscar el producto por cid y pid");
    }
  };

  async createOneProduct(product) {
    try {
      const newProduct = await productsMongo.createOne(product);
      return newProduct;
    } catch (error) {
      return  error;
    }
  }

  async updateOneProduct(id, product) {
    try {
      const updatedProduct = await productsMongo.updateOne(id, product);
      return updatedProduct;
    } catch (error) {
      return  error;
    }
  }

  async deleteOneProduct(id) {
    try {
      const deletedProduct = await productsMongo.deleteOne(id);
      return deletedProduct;
    } catch (error) {
      return  error;
    }
  }
}

export const productsService = new ProductsService();
