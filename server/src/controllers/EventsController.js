import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { eventsService } from "../services/EventsService";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
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
}