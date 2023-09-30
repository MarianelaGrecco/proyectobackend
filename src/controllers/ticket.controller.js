import { ticketService } from "../services/ticket.service.js";
import logger from "../utils/logger.js";


export const getTicket = async (req, res) => {
  try{
    const ticket = await ticketService.getTicket(req.params.tid);
    if (ticket) {
      logger.info("Ticket found:", ticket);
      res.json(ticket);
    } else {
      logger.warn("Ticket not found with ID:", req.params.tid);
      res.status(404).send("Ticket not found");
    }
  } catch (error) {
    logger.error("Error fetching ticket:", error);
    res.status(400).send(error);
  }
}


export const createTicket= async (req, res) => {
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

export const updateTicket = async (req, res) =>{
  try {
    const updatedTicket = await ticketService.updateTicket(req.params.tid, req.body);
    if (updatedTicket) {
      logger.info("Ticket updated successfully:", updatedTicket);
      res.send(updatedTicket);
    } else {
      logger.warn("Ticket not found with ID:", req.params.tid);
      res.status(404).send("Ticket not found");
    }
  } catch (error) {
    logger.error("Error updating ticket:", error);
    res.status(400).send(error);
  }
}

export const deleteTicket = async (req, res) => {
  try {
    const removedTicket = await ticketService.deleteTicket(req.params.tid);
    if (removedTicket) {
      logger.info("Ticket deleted successfully:", removedTicket);
      res.send(removedTicket);
    } else {
      logger.warn("Ticket not found with ID:", req.params.tid);
      res.status(404).send("Ticket not found");
    }
  } catch (error) {
    logger.error("Error deleting ticket:", error);
    res.status(400).send(error);
  }
}

