import express from 'express'
import { videoController } from '../controllers'

export const router = express.Router()

router.post('/', videoController.createVideo)
router.patch('/:videoId', videoController.updateVideo)
router.delete('/:videoId', videoController.deleteVideo)
router.get('/:videoId/relatives', videoController.getRelativeVideos)
router.post('/:videoId/comments', videoController.createComment)
router.get('/:videoId/comments', videoController.getComments)
router.post('/:videoId/like', videoController.likeVideo)
router.delete('/:videoId/like', videoController.unlikeVideo)
router.get('/:videoId/like/count', videoController.getLikeCount)
router.post('/:videoId/tags', videoController.addTag)
router.get('/:videoId/tags', videoController.getTags)
router.delete('/:videoId/tags/:tagTitle', videoController.deleteTag)
