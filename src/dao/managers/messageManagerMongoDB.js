import mongoose from "mongoose";

class MessageManagerDB {

    async getMessages(messageModel) {
        try {
            return await messageModel.find({}).lean()

        } catch (e) {
            return "[400] " + e.message
        }

    }

    async addMessage(messageInfo, messageModel) {
        try {
            const result = await messageModel.create(messageInfo)
            return this.getMessages(messageModel)
        } catch (e) {
            return "[400] " + e.message
        }
    }
}

export default MessageManagerDB