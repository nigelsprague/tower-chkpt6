import { Comment } from "@/models/Comment"
import { api } from "./AxiosService"
import { AppState } from "@/AppState"
import { logger } from "@/utils/Logger"

class CommentsService {
  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
    AppState.comments.splice(commentIndex, 1)
  }
  async getCommentsByEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log(res.data)
    const newComments = res.data.map(comment => new Comment(comment))
    AppState.comments = newComments
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    const createdComment = new Comment(res.data)
    AppState.comments.push(createdComment)
  }

}

export const commentsService = new CommentsService()