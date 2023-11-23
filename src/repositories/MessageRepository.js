class MessageRepository {
    constructor(dao, model) {
        this.dao = dao
        this.model = model
    }

    get = async () => {
        return await this.dao.getMessages(this.model)
    }

    create = async(data) => {
        return await this.dao.addMessage(data, this.model)
    }
}

export default MessageRepository