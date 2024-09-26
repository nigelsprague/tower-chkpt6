import { reactive } from 'vue'
import { Event } from './models/Event.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {Event[]} */
  towerEvents: [],
  /** @type {Event} */
  activeEvent: null
})

