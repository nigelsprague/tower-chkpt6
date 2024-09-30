import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/tickets', this.getMyTickets)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
    // TODO get tickets by account
  }
  async getMyTickets(req, res, nxt) {
    try {
      const user = req.userInfo
      const tickets = await ticketsService.getMyTickets(user.id)
      res.send(tickets)
    } catch (error) {
      nxt(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

}
