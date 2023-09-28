import { messageService } from "../services/message.service.js";
import logger from "../utils/logger.js";

export const saveMessage = async (req, res) => {
  const { user, message } = req.body;

  try {
    const newMessage = await messageService.saveMessage(user, message);
    logger.info("Message saved:", newMessage);
    res.status(201).json({ message: "Message saved", newMessage });
  } catch (error) {
    logger.error("Error saving message:", error);
    res.status(500).json({ error });
  }
};

export const findAllMessages = async (req, res) => {
  try {
    const messages = await messageService.findAllMessages();
    logger.info("Messages found:", messages);
    res.status(200).json({ message: "Messages found", messages });
  } catch (error) {
    logger.error("Error finding messages:", error);
    res.status(500).json({ error });
  }
};

