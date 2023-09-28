import { ticketService } from "../services/ticket.service.js";
import logger from "../utils/logger.js";

// Controlador para crear un nuevo ticket
async function createTicket(req, res) {
  const { code, amount, purchaser } = req.body;

  try {
    const ticket = await ticketService.createTicket(code, amount, purchaser);
    logger.info("Ticket created:", ticket);
    res.render("ticket", { ticket });
  } catch (error) {
    logger.error("Failed to create ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
}

export default {
  createTicket,
};
