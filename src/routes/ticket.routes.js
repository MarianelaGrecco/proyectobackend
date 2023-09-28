import { Router } from "express";
import { ticketModel } from "../persistencia/mongoDB/models/ticket.model.js";
import logger from "../utils/logger.js";

const ticketRouter = Router();

ticketRouter.get("/:tid", async (req, res) => {
  try {
    const ticket = await ticketModel.findById(req.params.tid);
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
});

ticketRouter.post("/", async (req, res) => {
  try {
    const newTicket = await ticketModel.create(req.body);
    logger.info("New ticket created:", newTicket);
    res.send(newTicket);
  } catch (error) {
    logger.error("Error creating ticket:", error);
    res.status(400).send(error);
  }
});

ticketRouter.put("/:tid", async (req, res) => {
  try {
    const updatedTicket = await ticketModel.findByIdAndUpdate(
      req.params.tid,
      req.body,
      { new: true }
    );
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
});

ticketRouter.delete("/:tid", async (req, res) => {
  try {
    const removedTicket = await ticketModel.findByIdAndRemove(req.params.tid);
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
});

export default ticketRouter;


