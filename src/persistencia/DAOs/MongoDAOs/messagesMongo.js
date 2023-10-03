import { messageModel } from "../../mongoDB/models/messages.model.js";
import BasicMongo from "./basicMongo.js";


class MessageMongo extends BasicMongo{
    constructor(model){
        super(model)
      }
}

export const messageMongo = new MessageMongo(messageModel)