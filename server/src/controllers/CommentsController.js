import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsServices";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }

  async createComment(req, res, nxt) {
    try {
      const commentData = req.body
      const user = req.userInfo
      commentData.creatorId = user.id
      const comment = await commentsService.createComment(commentData)
      res.send(comment)
    } catch (error) {
      nxt(error)
    }
  }

  async deleteComment(req, res, nxt) {
    try {
      const commentId = req.params.commentId
      const userId = req.userInfo.id
      const message = await commentsService.deleteComment(commentId, userId)
      res.send(message)
    } catch (error) {
      nxt(error)
    }
  }
}