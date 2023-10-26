import { productsService } from "../services/products.service.js";
import logger from "../utils/logger.js";
import { productsMongo } from "../persistencia/DAOs/MongoDAOs/productsMongo.js";
import Handlebars from "handlebars";

const renderProductsView = (products) => {
  const source = `
    <h1>Lista de Productos</h1>
    <div class="row" id="productsContainer">
      {{#each products}}
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h2>{{title}}</h2>
              <p><strong>Descripción:</strong> {{description}}</p>
              <p><strong>Precio:</strong> $ {{price}}</p>
              <p><strong>Categoría:</strong> {{category}}</p>
              <p><strong>Stock:</strong> {{stock}}</p>
              <!-- Formulario para agregar al carrito -->
              <form class="addToCartForm" data-pid="{{{_id}}}">
              <label for="quantityInput">Cantidad:</label>
              <input type="number" id="quantityInput" name="quantity" value="1" min="1" />
              <button type="submit">Agregar al carrito</button>
            </form>
            </div>
          </div>
        </div>
      {{/each}}
    </div>`;

  const template = Handlebars.compile(source);
  return template({ products });
};


//Muestra todos los productos

export const findAllProducts = async (req, res) => {
  try {
    const products = await productsMongo.findAllProducts();
    console.log("Products found:", products);

    // Renderiza la vista y envía la respuesta al cliente
    const html = renderProductsView(products);
    res.status(200).send(html);
  } catch (error) {
    console.error("Error finding products:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
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




