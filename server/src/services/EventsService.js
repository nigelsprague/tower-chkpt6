import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors";

class EventsService {
  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)
    if (userId != eventToCancel.creatorId) throw new Forbidden("You cannot cancel another user's event");
    eventToCancel.isCanceled = !eventToCancel.isCanceled
    await eventToCancel.save()
    return 'Event has been canceled'
  }
  async editEvent(eventId, eventData, userId) {
    const eventToUpdate = await dbContext.TowerEvents.findById(eventId)
    if (eventToUpdate.creatorId != userId) {
      throw new Forbidden("You cannot edit another user's event");
    }
    eventToUpdate.name = eventData.name ?? eventToUpdate.name
    eventToUpdate.description = eventData.description ?? eventToUpdate.description
    eventToUpdate.coverImg = eventData.coverImg ?? eventToUpdate.coverImg
    eventToUpdate.location = eventData.location ?? eventToUpdate.location
    eventToUpdate.capacity = eventData.capacity ?? eventToUpdate.capacity
    eventToUpdate.startDate = eventData.startDate ?? eventToUpdate.startDate
    // REVIEW should not be here since we use the cancelEvent from above
    // eventToUpdate.isCanceled = eventData.isCanceled ?? eventToUpdate.isCanceled
    eventToUpdate.type = eventData.type ?? eventToUpdate.type
    await eventToUpdate.save()
    return eventToUpdate
  }
  async getEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator').populate('ticketCount')
    return towerEvent
  }
  async getAllEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator').populate('ticketCount')
    return towerEvents
  }
  async createEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)
    await towerEvent.populate('creator')
    return towerEvent
  }

}

export const eventsService = new EventsService()