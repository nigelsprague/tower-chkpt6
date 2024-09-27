import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import { TicketSchema } from "../models/Ticket";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
  }

  async deleteTicket(req, res, nxt) {
    try {
      const ticketId = req.params.ticketId
      const userId = req.userInfo.id
      const message = await ticketsService.deleteTicket(ticketId, userId)
      res.send(message)
    }
    catch (error) {
      nxt(error);
    }
  }

  async createTicket(req, res, nxt) {
    try {
      const ticketData = req.body
      const userInfo = req.userInfo
      ticketData.accountId = userInfo.id
      const ticket = await ticketsService.createTicket(ticketData)
      res.send(ticket)
    } catch (error) {
      nxt(error)
    }
  }
}