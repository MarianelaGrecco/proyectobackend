import mongoose from "mongoose";
import config from "../../config/config.js";


mongoose
  .connect(config.mongo_uri)
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log("Error en MongoDB ;", error));