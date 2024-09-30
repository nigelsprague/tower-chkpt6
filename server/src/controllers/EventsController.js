import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService";
import { request } from "express";
import { ticketsService } from "../services/TicketsService";
import { commentsService } from "../services/CommentsServices";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/comments', this.getCommentsByEvent)
      .get('/:eventId/tickets', this.getTicketsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async getTicketsByEvent(req, res, nxt) {
    try {
      const eventId = req.params.eventId
      const attendees = await ticketsService.getTicketsbyEvent(eventId)
      res.send(attendees)
    } catch (error) {
      nxt(error)
    }
  }
  async cancelEvent(req, res, nxt) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const message = await eventsService.cancelEvent(eventId, userId)
      res.send(message)
    }
    catch (error) {
      nxt(error);
    }
  }

  async editEvent(req, res, nxt) {
    try {
      const eventId = req.params.eventId
      const eventData = req.body
      const user = req.userInfo
      const towerEvent = await eventsService.editEvent(eventId, eventData, user.id)
      res.send(towerEvent)
    }
    catch (error) {
      nxt(error);
    }
  }

  async getAllEvents(req, res, nxt) {
    try {
      const towerEvents = await eventsService.getAllEvents()
      res.send(towerEvents)
    } catch (error) {
      nxt(error)
    }
  }

  async getEventById(req, res, nxt) {
    try {
      const eventId = req.params.eventId
      const towerEvent = await eventsService.getEventById(eventId)
      res.send(towerEvent)
    } catch (error) {
      nxt(error)
    }
  }

  async createEvent(req, res, nxt) {
    try {
      const eventData = req.body
      const userInfo = req.userInfo
      eventData.creatorId = userInfo.id
      const towerEvent = await eventsService.createEvent(eventData)
      res.send(towerEvent)
    }
    catch (error) {
      nxt(error);
    }
  }

  async getCommentsByEvent(req, res, nxt) {
    try {
      const eventId = req.params.eventId
      const comments = await commentsService.getComments(eventId)
      res.send(comments)
    } catch (error) {
      nxt(error)
    }
  }
}