class TicketRepository {

    constructor(dao, model) {
        this.dao = dao
        this.model = model
    }

    async create(data) {
        return await this.dao.addTicket(data, this.model)
    }

}

export default TicketRepository