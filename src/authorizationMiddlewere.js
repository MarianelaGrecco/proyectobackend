const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // El usuario es un administrador
      next();
    } else {
      // El usuario no tiene los permisos de administrador
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
  
  const isUser = (req, res, next) => {
    if (req.user && !req.user.isAdmin) {
      // El usuario es un usuario normal
      next();
    } else {
      // El usuario no tiene los permisos de usuario normal
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
  
  export { isAdmin, isUser };