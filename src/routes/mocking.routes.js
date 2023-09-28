import { Router } from "express";
import { generateProduct } from "../utils/generateProduct.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import logger from "../utils/logger.js";

const mockingRouter = Router();

mockingRouter.get("/", async (req, res) => {
  try {
    const product = [];
    for (let i = 0; i < 100; i++) {
      product.push(generateProduct());
    }
    logger.info("Mock products generated successfully");
    res.json({ status: "success", playload: product });
  } catch (error) {
    logger.error("Error generating mock products:", error);
    res.status(500).json({ message: error });
  }
});

mockingRouter.post("/", (req, res) => {
  const { title, type, required, description, code, category, price, stock, status } = req.body;
  if (!title || !type || !required || !description || !code || !category || !price || !stock || !status) {
    const errorInfo = generateProductErrorInfo({ title, type, required, description, code, category, price, stock, status });
    CustomError.createError({
      name: "User creation error",
      cause: errorInfo,
      message: "Error trying to create Product",
      code: EErrors.PRODUCT_NOT_FOUND,
    });
    logger.error("Error trying to create Product:", errorInfo);
  }
  const product = {
    title,
    type,
    required,
    description,
    code,
    category,
    price,
    stock,
    status,
  };
  if (product.length === 0) {
    product.id = 1;
  } else {
    product.id = product[product.length - 1].id + 1;
  }
  product.push(product);
  logger.info("Mock product created successfully");
  res.send({ status: "success", playload: product });
});

export default mockingRouter;
