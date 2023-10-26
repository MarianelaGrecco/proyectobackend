document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  
  // Seleccionar todos los formularios con la clase "socketForm"
  const forms = document.querySelectorAll('.socketForm');

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const prodsIterator = new FormData(e.target);
      const prod = Object.fromEntries(prodsIterator);
      socket.emit("nuevoProducto", { prod });
      // Limpiar el formulario
      form.reset();
    });
  });

  if (forms.length === 0) {
    console.error("No forms with class 'socketForm' found");
  }
});






