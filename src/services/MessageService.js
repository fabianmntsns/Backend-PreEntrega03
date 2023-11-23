import MessageManagerDB from "../dao/managers/messageManagerMongoDB.js";
import messageModel from "../dao/models/messages.model.js";
import MessageRepository from "../repositories/MessageRepository.js";


class MessageService extends MessageRepository {
    constructor(dao) {
        super(dao, messageModel)
    }
}

export const messageService = new MessageService(new MessageManagerDB())


