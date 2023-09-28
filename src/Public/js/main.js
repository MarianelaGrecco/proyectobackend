const socket = io();

const formProduct = document.getElementById("formProducto");

formProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const prodsIterator = new FormData(e.target);
  const prod = Object.fromEntries(prodsIterator);
  socket.emit("nuevoProducto", { prod });
  // Limpiar el formulario
  formProduct.reset();
});




