import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TicketsService {
  async deleteTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)
    if (!ticketToDelete) throw Error(`Could not delete, no ticket with id: ${ticketId}`)
    if (userId != ticketToDelete.accountId) throw new Forbidden(`Ticket is not registered to you`)
    await ticketToDelete.deleteOne()
    return 'You are no longer holding a ticket for this event'
  }

  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return tickets
  }

  async getTicketsbyEvent(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
    return tickets
  }

  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('event')
    await ticket.populate('profile', 'picture name')
    return ticket
  }
}

export const ticketsService = new TicketsService()