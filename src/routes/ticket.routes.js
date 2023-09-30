import { Router } from "express";
import { createTicket, deleteTicket, getTicket, updateTicket } from "../controllers/ticket.controller.js";


const ticketRouter = Router();

ticketRouter.get("/:tid", getTicket);
ticketRouter.post("/", createTicket);
ticketRouter.put("/:tid", updateTicket);
ticketRouter.delete("/:tid", deleteTicket);

export default ticketRouter;


