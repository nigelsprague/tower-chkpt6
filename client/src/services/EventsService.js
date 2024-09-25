import { logger } from "@/utils/Logger"
import { api } from "./AxiosService"
import { Event } from "@/models/Event"
import { AppState } from "@/AppState"

class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log(res.data)
    const newEvents = res.data.map(eventData => new Event(eventData))
    AppState.towerEvents = newEvents
  }

}
export const eventsService = new EventsService()