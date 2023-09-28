import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, config.secret_key_jwt, { expiresIn: "1h" });
  return token;
};
