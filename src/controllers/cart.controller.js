import { cartService } from "../services/cart.service.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";
import loadUserCart from "../passportStrategies.js"


// Crear un nuevo carrito
export const createCart = async (req, res) => {
  const { uid } = req.params;
  try {
    const newCart = await cartService.createCartForUser ({ uid });
    logger.info("Cart created for user:", uid);
    res.status(201).json({ message: "Cart created", cart: newCart });
  } catch (error) {
    logger.error("Error creating cart for user:", uid, error);
    res.status(500).json({ error });
  }
};

// Obtener un carrito por su ID
export const findOneCart = async (req, res) => {
  const { cid } = req.params;
  try {
    console.log("Entering the getCart controller");
    console.log("Cart ID:", cid);
    const cart = await cartService.findOneCart(cid);
    if (cart) {
      logger.info("Cart found:", cid);
      res.status(200).json({ message: "Cart found", cart });
    } else {
      logger.warning("Cart not found:", cid);
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    logger.error("Error finding cart:", cid, error);
    res.status(500).json({ error });
  }
};


export const addToCart = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    if (!req.isAuthenticated()) {
      console.log("Usuario no autenticado");
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { pid, quantity } = req.body;

    // Verificar que tengas la información necesaria (productId, quantity)
    if (!pid || !quantity) {
      console.log("Falta información");
      return res.status(400).json({ error: "Falta información" });
    }

    // Obtener el usuario autenticado
    const user = req.user;
    console.log("Usuario autenticado:", user);

    // Asegurarse de que el usuario tenga un carrito
    if (!user.cart) {
      console.log("Usuario sin carrito");
      return res.status(500).json({ error: "Usuario sin carrito" });
    }

    // Realizar las operaciones necesarias para agregar productos al carrito
    const updatedCart = await cartService.addProductToCart(user.cart, pid, quantity);
    console.log("Updated Cart:", updatedCart);

    // Respuesta exitosa
    return res.status(200).json({ success: true, message: "Producto agregado al carrito" });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return res.status(500).json({ error: `Error interno del servidor: ${error.message}`  });
  }
};




// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    // Verificar que el usuario esté autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { uid, pid } = req.params;
    const { quantity } = req.body;

    // Verificar que tengas la información necesaria (pid, quantity)
    if (!pid || !quantity) {
      return res.status(400).json({ error: "Falta información" });
    }

    // Obtener el usuario autenticado
    const user = req.user;

    // Asegurarse de que el usuario tenga un carrito
    if (!user.cart) {
      return res.status(500).json({ error: "Usuario sin carrito" });
    }

    // Realizar las operaciones necesarias para agregar productos al carrito
    const updatedCart = await cartService.addProductToCart(user.cart, pid, quantity);

    // Respuesta exitosa
    return res.status(200).json({ message: "Producto agregado al carrito", cart: updatedCart });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Eliminar un producto del carrito
export const removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartService.removeProductFromCart(cid, pid);
    logger.info("Product removed from cart:", pid, "in cart:", cid);
    res
      .status(200)
      .json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    logger.error(
      "Error removing product from cart:",
      pid,
      "in cart:",
      cid,
      error
    );
    res.status(500).json({ error });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantityInCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  if (!quantity) {
    logger.warning(
      "Missing information to update product quantity in the cart:",
      req.body
    );
    return res.status(400).json({ message: "Missing information" });
  }
  try {
    const updatedCart = await cartService.updateProductQuantityInCart(
      cid,
      pid,
      quantity
    );
    logger.info("Product quantity updated in cart:", pid, "in cart:", cid);
    res
      .status(200)
      .json({ message: "Product quantity updated in cart", cart: updatedCart });
  } catch (error) {
    logger.error(
      "Error updating product quantity in cart:",
      pid,
      "in cart:",
      cid,
      error
    );
    res.status(500).json({ error });
  }
};

// Actualizar todo el carrito
export const updateOneCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await cartService.updateOneCart(cid, products);
    logger.info("Cart updated:", cid);
    res.status(200).json({ message: "Cart updated", cart: updatedCart });
  } catch (error) {
    logger.error("Error updating cart:", cid, error);
    res.status(500).json({ error });
  }
};

// Eliminar un carrito por su ID
export const deleteOneCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const deletedCart = await cartService.deleteOneCart(cid);
    logger.info("Cart deleted:", cid);
    res.status(200).json({ message: "Cart deleted", cart: deletedCart });
  } catch (error) {
    logger.error("Error deleting cart:", cid, error);
    res.status(500).json({ error });
  }
};

// Procesar una compra
export const processPurchase = async (req, res) => {
  const { cid } = req.params;
  try {
    const purchaseResult = await cartService.processPurchase(cid, req.user);
    logger.info("Purchase processed in cart:", cid);
    res.status(200).json(purchaseResult);
  } catch (error) {
    logger.error("Error processing purchase in cart:", cid, error);
    res.status(500).json({ error });
  }
};
