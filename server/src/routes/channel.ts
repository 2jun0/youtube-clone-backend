import express from 'express'
import * as channelContoller from '../controllers/channel'

export const router = express.Router()

router.post('/', channelContoller.createChannel)
router.patch('/:channelId', channelContoller.updateChannel)
router.delete('/:channelId', channelContoller.deleteChannel)
router.get('/:channelId', channelContoller.getChannel)
router.get('/:channelId/subscribe/count', channelContoller.getSubscribeCount)
router.get('/:channelId/subscribe/:subscribingId', channelContoller.subscribe)
router.get('/:channelId/subscribe/:subscribedId', channelContoller.unsubscribe)
