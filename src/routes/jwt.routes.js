import { Router } from "express";
import  usersModel  from "../persistencia/mongoDB/models/users.model.js";
import { compareData } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";
import logger from "../utils/logger.js";

const jwtRouter = Router();

jwtRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDB = await usersModel.findOne({ email });
    if (!userDB) {
      logger.error("Login failed: User not found");
      return res.status(400).send("Wrong email or password");
    }
    const isPassword = await compareData(password, userDB.password);
    if (!isPassword) {
      logger.error("Login failed: Incorrect password");
      return res.status(401).send("Wrong email or password");
    }
    const token = generateToken(userDB);
    logger.info("User logged in successfully");
    res.status(200).json({ message: "Login", token });
  } catch (error) {
    logger.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

jwtRouter.get(
  "/validation",
  passport.authenticate("jwtStrategy", { session: false }),
  (req, res) => {
    try {
      const { email } = req.user;
      logger.info(`Validating user: ${email}`);
      res.send(`Probando ${email}`);
    } catch (error) {
      logger.error("Error during user validation:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default jwtRouter;
