import express from 'express'
import { channelController } from '../controllers'

export const router = express.Router()

router.post('/', channelController.createChannel)
router.patch('/:channelId', channelController.updateChannel)
router.delete('/:channelId', channelController.deleteChannel)
router.get('/:channelId', channelController.getChannel)
router.get('/:channelId/subscribe/count', channelController.getSubscribeCount)
router.get('/:channelId/subscribe/:subscribingId', channelController.subscribe)
router.get('/:channelId/subscribe/:subscribedId', channelController.unsubscribe)
