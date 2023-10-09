import { Router } from "express";
import {
  checkAuth,
  cleanInactiveUsers,
  createOneUser,
  findAllUsers,
  findOneUser,
  logoutUser,
  updatePremiumStatus,
  uploadDocuments,
  userProfile,
} from "../controllers/users.controller.js";
import passport from "passport";
import isAuthenticated from "../authMidlewere.js";

const userRouter = Router();

userRouter.get("/", findAllUsers);

userRouter.get("/:uid", findOneUser);

userRouter.post("/signup", createOneUser);

userRouter.get("/profile", userProfile );

// Login con Passport
userRouter.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    failureRedirect: "/api/views/errorLogin",
    failureFlash: true, // Usar si estás utilizando mensajes flash para errores
  }),
  (req, res) => {
    // Después de autenticar, usa req.login para establecer la sesión
    req.login(req.user, (err) => {
      if (err) {
        // Manejar el error, si es necesario
        return res.status(500).json({ error: "Error de autenticación al iniciar sesión" });
      }
      // Redirigir al perfil del usuario u otra página después de iniciar sesión
      return res.redirect("/api/views/profile");
    });
  }
);

userRouter.get('/check-auth', isAuthenticated, checkAuth);

userRouter.post('/:uid/documents', isAuthenticated, uploadDocuments);

userRouter.put("/:uid/premium", isAuthenticated, updatePremiumStatus);


userRouter.get('/logout', logoutUser);

userRouter.delete('/cleanInactiveUsers', cleanInactiveUsers);




export default userRouter;
