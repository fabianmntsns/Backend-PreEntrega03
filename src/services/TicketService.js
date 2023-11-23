import TicketMongoDB from "../dao/managers/ticketManagerMongoDB.js";
import TicketModel from "../dao/models/ticket.model.js";
import TicketRepository from "../repositories/TicketRepository.js";

class TicketService extends TicketRepository {
    constructor(dao) {
        super(dao, TicketModel)
    }
}

export const ticketService = new TicketService(new TicketMongoDB)


