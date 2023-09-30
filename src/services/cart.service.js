import { cartMongo } from "../persistencia/DAOs/MongoDAOs/cartMongo.js";

class CartService {
  async findOneCart(cid) {
    try {
      const cart = await cartMongo.findOneById(cid);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async createCartForUser(uid) {
    try {
      const newCart = await cartMongo.createOne({ uid, products: [] });
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const cart = await cartMongo.findOneById(cid);
      console.log("Cart before adding product:", cart);
      if (!cart) {
        console.log("Cart not found");
        throw new Error("Cart not found");
      }

      // Verificar e inicializar cart.products si es necesario
      if (!cart.products) {
        cart.products = [];
      }

      // Verifica si el producto ya existe en el carrito
      const existingProduct = cart.products.find(
        (products) => products.pid === pid
      );
      console.log("Existing product:", existingProduct);

      if (existingProduct) {
        // Si el producto ya existe, simplemente actualiza la cantidad
        existingProduct.quantity = quantity;
      } else {
        // Si el producto no existe, agrégalo al carrito
        cart.products.push({ pid, quantity });
      }

      // Guarda el carrito actualizado en la base de datos
      const updatedCart = await cart.save();
      console.log("Cart after adding product:", updatedCart);

      return updatedCart;
    } catch (error) {
      console.error("Error in addProductToCart:", error);
      throw error;
    }
  }

  async removeProductFromCart(cid, pid) {
    try {
      const cart = await cartMongo.findOneById(cid);

      if (!cart) {
        throw new Error("Cart not found");
      }
      const updatedProducts = cart.products.filter(
        (product) => product._id.toString() !== pid
      );
      const updatedCart = await cartMongo.updateOne(cid, {
        products: updatedProducts,
      });
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantityInCart(cid, pid, quantity) {
    try {
      const cart = await cartMongo.findOneById(cid);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const productIndex = cart.products.findIndex(
        (product) => product._id.toString() === pid
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products[productIndex].quantity = quantity;
      const updatedCart = await cartMongo.updateOne(cid, {
        products: cart.products,
      });
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async updateOneCart(cid, products) {
    try {
      const cart = await cartMongo.updateOne(cid, products, { new: true });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneCart(cid) {
    try {
      const deletedCart = await cartMongo.deleteOne(cid);
      return deletedCart;
    } catch (error) {
      throw error;
    }
  }

  async processPurchase(cid, user) {
    try {
      const cart = await cartMongo
        .findOne({ _id: cid })
        .populate("products.id_prod");
        
        if (!cart) {
          throw new Error("Cart not found");
        }
        if (!cart.products || cart.products.length === 0) {
          throw new Error("Cart is empty");
        }
        await cartMongo.deleteOne({ _id: cid });
        const resultadoCompra = {
          message: "Purchase processed successfully",
        };
      return resultadoCompra;
    } catch (error) {
      throw error;
    }
  }
}

export const cartService = new CartService();
