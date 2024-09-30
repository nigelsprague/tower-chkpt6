import { Comment } from "@/models/Comment"
import { api } from "./AxiosService"
import { AppState } from "@/AppState"
import { logger } from "@/utils/Logger"

class CommentsService {
  async getCommentsByEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log(res.data)
    const newComments = res.data.map(comment => new Comment(comment))
    AppState.comments = newComments
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    const newcomment = new Comment(res.data)
    AppState.comments.unshift(newcomment)
  }

}

export const commentsService = new CommentsService()