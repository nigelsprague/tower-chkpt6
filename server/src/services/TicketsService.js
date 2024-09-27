import { dbContext } from "../db/DbContext"

class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('event')
    await ticket.populate('profile', 'picture name')
    return ticket
  }
}

export const ticketsService = new TicketsService()