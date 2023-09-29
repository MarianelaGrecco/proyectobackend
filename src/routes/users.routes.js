import { Router } from "express";
import {
  createOneUser,
  findAllUsers,
  findOneUser,
  logoutUser,
  updatePremiumStatus,
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

// Ruta para actualizar al usuario a premium si ha cargado los documentos requeridos
userRouter.put("/premium/:uid", updatePremiumStatus);

// // Ruta para subir documentos
// userRouter.post('/:uid/documents', upload.array('documents'), async (req, res) => {
//   const { uid } = req.params;

//   try {
//     const user = await usersModel.findOne({ uid });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Actualizar el estado del usuario para indicar que ha subido un documento
//     user.documents.push(...req.files.map((file) => ({
//       name: file.originalname,
//       reference: file.path, // Usamos file.path para guardar la referencia al archivo
//     })));
//     await user.save();

//     logger.info('Document uploaded successfully');
//     res.status(200).json({ message: 'Document uploaded successfully' });
//   } catch (error) {
//     logger.error('Error uploading document:', error);
//     res.status(500).json({ error });
//   }
// });

userRouter.get('/logout', logoutUser);

// userRouter.get("/logout", async (req, res) => {
//   try {
//     if (!req.isAuthenticated()) {
//       return res.status(401).send("No estás autenticado.");
//     }
//     // Obtén el ID del usuario autenticado
//     const userId = req.user._id;
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).send("ID de usuario no válido");
//     }

//     const user = await usersModel.findOneById(uid);
//     if (!user) {
//       return res.status(404).send("Usuario no encontrado en la base de datos");
//     }

//     req.logout();

//     res.redirect("/");
//   } catch (error) {
//     console.error("Error en la función de logout:", error);
//     res.status(500).send("Error en el servidor");
//   }
// });


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
