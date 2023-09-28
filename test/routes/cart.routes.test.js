import { expect } from "chai";
import supertest from "supertest";
import { dropCart } from "../setup.test.js";

const requester = supertest("http://localhost:4000");

describe("Test routes Cart", () => {
  before(async () => {
    await dropCart();
  })

  it("[GET] /api/cart/:cid", async () => {
    const cartId = "64f7463a5ec4261de0a0d261";

    const response = await requester.get(`/api/cart/${cartId}`);
    expect(response.statusCode).to.equal(200);
  });

  it('[POST] /api/cart', async () => {
    // Realiza una solicitud POST para crear un nuevo carrito
    const response = await requester.post('/api/cart');
    expect(response.statusCode).to.equal(200);
  });
});


