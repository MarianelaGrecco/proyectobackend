import { expect } from "chai";
import supertest from "supertest";
import { dropProducts } from "../setup.test.js";

const requester = supertest("http://localhost:4000");

describe("Test routes Products", () => {
  before(async () => {
    await dropProducts();
  });

  it("[GET] /api/products", async () => {
    const response = await requester.get("/api/products");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an("array");

    response.body.forEach((product) => {
      expect(product).to.be.an("object");
      expect(product).to.have.property("title").that.is.a("string");
      expect(product).to.have.property("description").that.is.a("string");
      expect(product).to.have.property("code").that.is.a("string");
      expect(product).to.have.property("category").that.is.a("string");
      expect(product).to.have.property("price").that.is.a("number");
      expect(product).to.have.property("stock").that.is.a("number");
      expect(product).to.have.property("status").that.is.a("boolean");
      expect(product).to.have.property("thumbnail").that.is.an("array");
    });
  });

  it("[POST] /api/products/nuevoProducto", async () => {
    const mockProduct = {
      title: "Quinotos",
      description: "Descripcion del producto",
      code: "P6",
      category: "Categoria 6",
      price: 140,
      stock: 50,
      status: true,
      thumbnail: [],
    };
    const response = await requester
      .post("/api/products/nuevoProducto")
      .send(mockProduct);
    expect(response.statusCode).to.equal(200);
  });

  it("[PUT] /api/products/:pid", async () => {
    const productId = "64f66444d451d01f3e1bca64";
    const updatedProduct = {
      title: "Nuevo título",
    };
    const response = await requester
      .put(`/api/products/${productId}`)
      .send(updatedProduct);
    expect(response.statusCode).to.equal(200);
  });

  it("[DELETE] /api/products/:pid", async () => {
    const productId = "64f66444d451d01f3e1bca64";
    const response = await requester.delete(`/api/products/${productId}`);
    expect(response.statusCode).to.equal(200);
  });
});
