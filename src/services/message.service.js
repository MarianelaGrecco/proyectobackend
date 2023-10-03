import { messageMongo} from '../persistencia/DAOs/MongoDAOs/messagesMongo.js'

class MessageService {
  async saveMessage(user, message) {
    try {
      const newMessage = await messageMongo.create({ user, message });
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async findAllMessages() {
    try {
      const messages = await messageMongo.find();
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

export const messageService = new MessageService();
;