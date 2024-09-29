import { Profile } from "./Profile"

export class Ticket{
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
  }
}

export class TicketProfile extends Ticket {
  constructor(data) {
    super(data)
    this.profile = new Profile(data.profile)
  }
}

export class TicketEvent extends Ticket {
  constructor(data) {
    super(data)
    this.towerEvent = new Event(data.event)
  }
}
