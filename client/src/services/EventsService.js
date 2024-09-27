import { logger } from "@/utils/Logger"
import { api } from "./AxiosService"
import { Event } from "@/models/Event"
import { AppState } from "@/AppState"

class EventsService {
  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    logger.log(res.data)
    AppState.activeEvent.isCanceled = !AppState.activeEvent.isCanceled
  }
  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    const createdEvent = new Event(res.data)
    AppState.towerEvents.push(createdEvent)
    return createdEvent
  }
  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    logger.log(res.data)
    AppState.activeEvent = new Event(res.data)
  }
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log(res.data)
    const newEvents = res.data.map(eventData => new Event(eventData))
    AppState.towerEvents = newEvents
  }

}
export const eventsService = new EventsService()