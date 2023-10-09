const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // Redirigir o manejar la no autenticación según tus necesidades
    res.status(401).json({ message: "User not authenticated" });
  }
};

export default isAuthenticated;


