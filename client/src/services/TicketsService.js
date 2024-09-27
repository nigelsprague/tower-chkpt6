import { TicketProfile } from "@/models/Ticket"
import { api } from "./AxiosService"
import { AppState } from "@/AppState"

class TicketsService{
  async getTicketHolders(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    const ticketHolders = res.data.map(ticketData => new TicketProfile(ticketData))
    AppState.attendingProfiles = ticketHolders
  }

}

export const ticketsService = new TicketsService()