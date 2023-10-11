import { Router } from "express";
import { createOneProduct, findAllProducts, findOneProduct, updateOneProduct, deleteOneProduct} from "../controllers/products.controller.js";
import isAuthenticated from "../authMidlewere.js";

const productsRouter = Router();

// Añadir al comienzo de tu archivo products.routes.js
productsRouter.get("/:pid/detalle", (req, res) => {
    const { pid } = req.params;
    res.render("product-details", { pid });
  });
  
  productsRouter.get("/", isAuthenticated, findAllProducts);
  
  
productsRouter.get("/:pid", findOneProduct);

productsRouter.post("/nuevoProducto", createOneProduct);

productsRouter.put("/:pid", updateOneProduct);

productsRouter.delete("/:pid", deleteOneProduct);

export default productsRouter;

