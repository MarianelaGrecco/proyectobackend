import { Router } from "express";
import { saveMessage, getMessages } from "../controllers/chat.controller.js";
import logger from "../utils/logger.js";

const chatRouter = Router();

chatRouter.post("/save-message", (req, res) => {
  try {
    logger.info("Guardando mensaje en el chat...");
    saveMessage(req, res); 
  } catch (error) {
    logger.error("Error al guardar el mensaje en el chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

chatRouter.get("/messages", (req, res) => {
  try {
    logger.info("Obteniendo mensajes del chat...");
    getMessages(req, res); 
  } catch (error) {
    logger.error("Error al obtener los mensajes del chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default chatRouter;

