import { CommentRespository, LikeRepository } from '../repositories'
import { middleware } from '../middlewares/middleware'

export const replyToComment: middleware = async (req, res, next) => {
  try {
    const commentId = req.params.commentId as unknown as number
    const contents = req.body.contents
    const savedComment = await CommentRespository.saveForComment(
      commentId,
      contents
    )
    return res.send(savedComment)
  } catch (err) {
    console.error(err)
  }
}

export const updateComment: middleware = async (req, res, next) => {
  try {
    const commentId = req.params.commentId as unknown as number
    const contents = req.body.contents
    const updatedComment = await CommentRespository.update(commentId, {
      contents,
    })
    res.send(updatedComment)
  } catch (err) {
    console.error(err)
  }
}

export const deleteComment: middleware = async (req, res, next) => {
  try {
    const commentId = req.params.commentId as unknown as number
    await CommentRespository.delete(commentId)
  } catch (err) {
    console.error(err)
  }
}

export const getComment: middleware = async (req, res, next) => {
  try {
    const commentId = req.params.commentId as unknown as number
    const comment = await CommentRespository.findOneBy({ id: commentId })
    res.send(comment)
  } catch (err) {
    console.error(err)
  }
}

/** TODO: jwt 하고 나서 씀 */
export const likeComment: middleware = async (req, res, next) => {
  try {
    const commentId = req.params.commentId as unknown as number
    const isLike = req.body.isLike as unknown as boolean
  } catch (err) {
    console.error(err)
  }
}

/** TODO: jwt 하고 나서 씀 */
export const unlikeComment: middleware = async (req, res, next) => {
  try {
    const commentId = req.params.commentId as unknown as number
    const isLike = req.body.isLike as unknown as boolean
  } catch (err) {
    console.error(err)
  }
}

export const getLikeCount: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const isLike = req.query.isLike as unknown as boolean

    const count = await LikeRepository.countByCommentId(videoId, isLike)
    res.send({ count })
  } catch (err) {
    console.error(err)
  }
}
