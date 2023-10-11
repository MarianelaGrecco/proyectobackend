document.addEventListener("DOMContentLoaded", () => {

  let productsContainer;
  
  fetch("/api/users/check-auth", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Check Auth Response:", data);

      if (data.authenticated) {
        return fetch("/api/products", {
          method: "GET",
          credentials: "include",
        });
      } else {
        console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión...");
        // Puedes redirigir a la página de inicio de sesión u tomar otras medidas
        throw new Error("Usuario no autenticado");
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      // Acceder a los productos en la respuesta
  const products = data.products;

  // ...

  // Agregar el HTML directamente al contenedor de productos
  productsContainer = document.getElementById("productsContainer");

  if (productsContainer) {
    // Utilizar la plantilla Handlebars para renderizar los productos
    const source = document.getElementById("product-template").innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ products });

    // Insertar el HTML en el contenedor de productos
    productsContainer.innerHTML = html;

        // Event listener para el formulario de agregar al carrito
        productsContainer.querySelectorAll(".addToCartForm").forEach((form) => {
          form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("Formulario enviado...");
            const pid = form.dataset.pid;
            const quantity = form.querySelector("#quantityInput").value;

            // Hacer la solicitud para agregar al carrito
            fetch(`/api/cart/add-to-cart?pid=${pid}&quantity=${quantity}`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((addToCartResponse) => {
                // Manejar la respuesta de agregar al carrito...
              })
              .catch((addToCartError) => {
                console.error("Error al agregar al carrito:", addToCartError);
              });
          });
        });
      }
    })
    .catch((error) => {
      console.error("Error al verificar la autenticación o al obtener productos:", error);
    });
});


  
    
