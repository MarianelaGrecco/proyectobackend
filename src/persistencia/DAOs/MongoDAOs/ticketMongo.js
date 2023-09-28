import { ticketModel } from "../../mongoDB/models/ticket.model.js";
import BasicMongo from "./basicMongo.js";

class TicketMongo extends BasicMongo {
  constructor(model) {
    super(model);
  }
}

export const ticketMongo = new TicketMongo(ticketModel);
