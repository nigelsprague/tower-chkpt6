import { dbContext } from "../db/DbContext"

class EventsService {
  async getEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
    return towerEvent
  }
  async getAllEvents() {
    const towerEvents = await dbContext.TowerEvents.find()
    return towerEvents
  }
  async createEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)
    return towerEvent
  }

}

export const eventsService = new EventsService()