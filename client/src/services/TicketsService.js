import { TicketEvent, TicketProfile } from "@/models/Ticket"
import { api } from "./AxiosService"
import { AppState } from "@/AppState"
import { logger } from "@/utils/Logger"

class TicketsService{
  async getAccountTickets() {
    const res = await api.get('account/tickets')
    const eventTickets = res.data.map(ticketData => new TicketEvent(ticketData))
    AppState.accountHeldTickets = eventTickets
  }

  async deleteTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log(res.data)
    const ticketIndex = AppState.accountHeldTickets.findIndex(ticket => ticket.id == ticketId)
    AppState.accountHeldTickets.splice(ticketIndex, 1)
  }

  async createTicket(ticketData) {
    const res = await api.post(`api/tickets`, ticketData)
    const newTicket = new TicketProfile(res.data)
    AppState.attendingProfiles.push(newTicket)
    AppState.activeEvent.ticketCount++
  }

  async getTicketHolders(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    const ticketHolders = res.data.map(ticketData => new TicketProfile(ticketData))
    AppState.attendingProfiles = ticketHolders
  }

}

export const ticketsService = new TicketsService()