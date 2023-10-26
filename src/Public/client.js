document.addEventListener("DOMContentLoaded", async () => {
  let productsContainer;

  try {
    const authResponse = await fetch("/api/users/check-auth", { method: "GET", credentials: "include" });
    const authData = await handleErrors(authResponse);

    if (!authData.authenticated) {
      throw new Error("Usuario no autenticado");
    }

    const productsResponse = await fetch("/api/products", { method: "GET", credentials: "include" });
    const productsData = await handleErrors(productsResponse);

    if (productsData.error) {
      throw new Error(productsData.error);
    }

    const products = productsData.products;
    productsContainer = document.getElementById("productsContainer");

    if (!productsContainer) {
      console.error("No se encontró el contenedor de productos en el DOM.");
      return;
    }

    const source = document.getElementById("product-template").innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ products });
    productsContainer.innerHTML = html;

    // Agregar al carrito desde el botón
async function addToCart (pid) {
  console.log("Botón de agregar al carrito clicado");

  const quantity = document.getElementById("quantityInput").value;

  
      console.log("Product ID:", pid);
      console.log("Quantity:", quantity);
  
      try {
        // Hacer la solicitud para agregar al carrito
        const response = await fetch(`/api/cart/add-to-cart?pid=${pid}&quantity=${quantity}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();

        if (data.success) {
          console.log("Producto agregado al carrito correctamente");
    
  
          const cartResponse = await fetch("/api/cart", {
            method: "GET",
            credentials: "include",
          });
    
          const cartData = await cartResponse.json();
    
          const cartContainer = document.getElementById("cartContainer");
          cartContainer.innerHTML = ""; 
    
          cartData.cart.products.forEach((product) => {
            const productElement = document.createElement("div");
            productElement.textContent = `${product.title} - Cantidad: ${product.quantity}`;
            cartContainer.appendChild(productElement);
          });
        } else {
          console.error("Error al agregar al carrito:", data.message);
        }
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
      }
    }

  } catch (error) {
    console.error("Error en la carga de productos:", error);
  }
});

async function handleErrors(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    // Si no se puede parsear como JSON, devolver el texto directamente
    return { error: await response.text() };
  }
}


