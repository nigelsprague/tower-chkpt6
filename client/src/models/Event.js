import { AppState } from "@/AppState"
import { Account } from "./Account"

export class Event {
  /**@type {Account} */
  creator
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creatorId = data.creatorId
    this.ticketCount = data.ticketCount
    // this.creator = new Account(data.creator || AppState.account || {})
    this.creator = data.creator ? new Account(data.creator) : null
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  get eventDate() {
    const eventDay = new Date(this.startDate).toUTCString()
    return eventDay
  }
}