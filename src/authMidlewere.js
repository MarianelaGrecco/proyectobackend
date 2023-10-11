const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Usuario autenticado");
    return next();
  } else {
    console.log("Usuario no autenticado");
    return res.status(401).json({
      authenticated: false,
      message: "User not authenticated"
  })
}
}


export default isAuthenticated;


