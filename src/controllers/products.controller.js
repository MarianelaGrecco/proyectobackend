import { productsService } from "../services/products.service.js";
import logger from "../utils/logger.js";
import { productsMongo } from "../persistencia/DAOs/MongoDAOs/productsMongo.js";




//Muestra todos los productos

export const findAllProducts = async (req, res) => {
  try {
    const products = await productsMongo.findAllProducts();
    console.log("Products found:", products);
    const user = req.user;
    const uid = user ? user._id : null;

    res.json({ products, user, uid });
  } catch (error) {
    console.error("Error finding products:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error", message: error.message });
  }
};



//Busca un producto por su id
export const findOneProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsService.findOneProduct(pid);
 
      logger.info("Product found:", product);

  
      res.status(200).json({ message: "Product found", product });
    } catch (error) {
      res.status(500).json({ error: "Error finding the product" });
    }
};

//Crea un nuevo producto
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

//Modificar un producto
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

//Borrar un producto por su id
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




