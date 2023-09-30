import { ticketMongo } from "../persistencia/DAOs/MongoDAOs/ticketMongo.js";

class TicketService {
  async getTicket(tid) {
    return ticketMongo.findOneById(tid);
  }
  
  async createTicket(code, amount, purchaser) {
    const ticket = await ticketMongo.createOne({ code, amount, purchaser });
    return ticket;
  }
  
  async updateTicket(tid, data) {
    return ticketMongo.updateOne(tid, data);
  }

  async deleteTicket(tid) {
    return ticketMongo.deleteOne(tid);
  }

}
export const ticketService = new TicketService();


