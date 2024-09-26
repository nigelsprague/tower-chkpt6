export class Event {
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
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  get eventDate() {
    const eventDay = new Date(this.startDate).toLocaleDateString()
    const eventTime = new Date(this.startDate).toLocaleTimeString()
    return eventDay + ' at ' + eventTime
  }
}