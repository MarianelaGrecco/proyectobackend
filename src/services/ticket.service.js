import { ticketMongo } from "../persistencia/DAOs/MongoDAOs/ticketMongo.js";

// Crear un nuevo ticket
async function createTicket(code, amount, purchaser) {
  const ticket = new ticketMongo({
    code,
    amount,
    purchaser,
  });

  await ticket.save();

  return ticket;
}

export default {
  createTicket,
};
