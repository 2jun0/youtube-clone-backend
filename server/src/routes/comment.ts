import express from 'express'
import { commentController } from '../controllers'

export const router = express.Router()

router.post('/:commentId/reply', commentController.replyToComment)
router.patch('/:commentId', commentController.updateComment)
router.delete('/:commentId', commentController.deleteComment)
router.get('/:commentId', commentController.getComment)
router.get('/:commentId/like', commentController.likeComment)
router.delete('/:commentId/like', commentController.unlikeComment)
router.get('/:commentId/like/count', commentController.getLikeCount)
