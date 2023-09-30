import { Router } from "express";
import {
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

userRouter.post('/:uid/documents', uploadDocuments);

userRouter.put("/:uid/premium", updatePremiumStatus);


userRouter.get('/logout', logoutUser);

userRouter.delete('/cleanInactiveUsers', cleanInactiveUsers);


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
