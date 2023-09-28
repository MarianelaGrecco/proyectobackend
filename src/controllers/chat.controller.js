import { messageService } from "../services/message.service.js";
import logger from "../utils/logger.js";

export const saveMessage = async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await messageService.create({ user, message });
    logger.info("Message saved:", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    logger.error("Error saving message:", error);
    res.status(500).json({ error: "Error al guardar el mensaje" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await messageService.find();
    logger.info("Messages retrieved:", messages);
    res.status(200).json(messages);
  } catch (error) {
    logger.error("Error getting messages:", error);
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
};


