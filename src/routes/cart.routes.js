import { Router } from "express";
import {
  createCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart,
  processPurchase,
  findOneCart,
  deleteOneCart,
  updateOneCart,
  addToCart,
} from "../controllers/cart.controller.js";
import isAuthenticated from "../authMidlewere.js";

const cartRouter = Router();

// Rutas base para el carrito
cartRouter.get("/:cid", findOneCart);
cartRouter.post("/create/:uid",isAuthenticated, createCart);

cartRouter.post("/add-to-cart", isAuthenticated, addToCart);


// Rutas relacionadas con productos en el carrito
cartRouter.post("/:cid/products/:pid", addProductToCart);
cartRouter.delete("/:cid/products/:pid", removeProductFromCart);
cartRouter.put("/:cid/products/:pid", updateProductQuantityInCart);

// Otras rutas del carrito
cartRouter.put("/:cid", updateOneCart);
cartRouter.delete("/:cid", deleteOneCart);

// Ruta para realizar una compra
cartRouter.post("/:cid/purchase", processPurchase);

export default cartRouter;


