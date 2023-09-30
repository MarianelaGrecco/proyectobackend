import { Router } from "express";
import {
  createOneUser,
  findAllUsers,
  findOneUser,
  logoutUser,
  updatePremiumStatus,
  uploadDocuments,
  userProfile,
} from "../controllers/users.controller.js";
import passport from "passport";

const userRouter = Router();

userRouter.get("/", findAllUsers);

userRouter.get("/:uid", findOneUser);

userRouter.post("/signup", createOneUser);

userRouter.get("/profile", userProfile);

// Login con Passport
userRouter.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    failureRedirect: "/api/views/errorLogin",
    successRedirect: "/api/views/profile",
    failureMessage: "",
  })
);

// Ruta para subir documentos
userRouter.post('/:uid/documents', uploadDocuments);
// Ruta para actualizar al usuario a premium si ha cargado los documentos requeridos
userRouter.put("/:uid/premium", updatePremiumStatus);

userRouter.get('/logout', logoutUser);


//GitHub
userRouter.get(
  "/githunSingup",
  passport.authenticate("githubSignup", { scope: ["user:email"] })
);

userRouter.get(
  "/github",
  passport.authenticate("githubSignup", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/api/views/profile");
  }
);

export default userRouter;
