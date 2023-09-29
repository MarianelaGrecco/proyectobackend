import { productsService } from "../services/products.service.js";
import logger from "../utils/logger.js";

export const findAllProducts = async (req, res) => {
  try {
    const products = await productsService.findAllProducts();
    logger.info("Products found:", products); 
   
    products.forEach(product => {
      product._id = product._id.toString(); // Convierte _id a string
    });
   
    const cid = req.params.cid || null;
    const pid = req.params.pid || null;
    
    console.log("CID:", cid);
    console.log("PID:", pid);

    res.render("products", { products, cid, pid });
  } catch (error) {
    logger.error("Error finding products:", error);
    res.status(500).json({ error });
  }
};


export const findOneProduct = async (req, res) => {
  const { pid } = req.params;
  console.log("Product ID:", pid);
  try {
    const products = await productsService.findOneProduct(pid);
    if (products) {
      logger.info("Product found:", products);
      res.render("product-detail", { products, pid });
    } else {
      logger.warn("Product not found");
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    logger.error("Error finding product:", error);
    res.status(500).json({ error });
  }
};

export const createOneProduct = async (req, res) => {
  const {
    title,
    description,
    code,
    category,
    price,
    stock,
    status,
    thumbnail,
  } = req.body
  
  if (!title|| !description|| !code|| !category|| !price|| !stock) {
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const newProduct = await productsService.createOneProduct(req.body);
    logger.info("Product created:", newProduct);
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    logger.error("Error creating product:", error);
    res.status(500).json({ error });
  }
}


export const updateOneProduct = async (req, res) => {
  const { pid } = req.params;
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const updatedProduct = await productsService.updateOneProduct(pid, req.body);
    logger.info("Product updated:", updatedProduct);
    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    logger.error("Error updating product:", error);
    res.status(500).json({ error });
  }
};

export const deleteOneProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await productsService.deleteOneProduct(pid);
    logger.info("Product deleted:", deletedProduct);
    res.status(200).json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    logger.error("Error deleting product:", error);
    res.status(500).json({ error });
  }
};
