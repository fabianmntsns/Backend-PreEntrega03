
class TicketMongoDB {

    addTicket = async(newTicket, modelTicket) => {
        try {
            const result = await modelTicket.create(newTicket)
            return result
        } catch (e) {
            return "[400] " + e.message
        }
    }

}

export default TicketMongoDB