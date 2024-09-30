import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentsService {
  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    if (!commentToDelete) throw Error(`Could not delete, no comment with id: ${commentId}`)
    if (userId != commentToDelete.creatorId) throw new Forbidden('This comment is not yours to delete')
    await commentToDelete.deleteOne()
    return 'Comment deleted'
  }
  async getComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

}

export const commentsService = new CommentsService()