fetch("/check-auth", {
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
      // Usuario autenticado, realizar acciones adicionales...
    } else {
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión...");
    }
  })
  .catch((error) => {
    console.error("Error al verificar la autenticación:", error);
  });








  