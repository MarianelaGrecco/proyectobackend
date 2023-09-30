const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // El usuario es un administrador
      next();
    } else {
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
  
  const isUser = (req, res, next) => {
    if (req.user && !req.user.isAdmin) {
      // El usuario es un usuario comun
      next();
    } else {
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
  
  export { isAdmin, isUser };