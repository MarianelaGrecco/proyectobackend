import { Router } from "express";
import { createOneProduct, findAllProducts, findOneProduct, updateOneProduct, deleteOneProduct, showProductDetails } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", findAllProducts);

productsRouter.get("/:cid/:pid", showProductDetails);

productsRouter.get("/:pid", findOneProduct);

productsRouter.post("/nuevoProducto", createOneProduct);

productsRouter.put("/:pid", updateOneProduct);

productsRouter.delete("/:pid", deleteOneProduct);

export default productsRouter;
