import express from 'express'
import { communityPostController } from '../controllers'

export const router = express.Router()

router.post('/', communityPostController.createPost)
router.patch('/:postId', communityPostController.updatePost)
router.get('/:postId', communityPostController.getPost)
router.delete('/:postId', communityPostController.deletePost)
router.post('/:postId/comments', communityPostController.createComment)
router.get('/:postId/comments', communityPostController.getComments)
router.post('/:postId/like', communityPostController.likePost)
router.delete('/:postId/like', communityPostController.unlikePost)
router.get('/:postId/like/count', communityPostController.getLikeCount)
router.post('/:postId/tags', communityPostController.addTag)
router.get('/:postId/tags', communityPostController.getTags)
router.delete('/:postId/tags/:tagTitle', communityPostController.deleteTag)
