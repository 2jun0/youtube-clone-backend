import express from 'express'
import { hashtagController } from '../controllers'

export const router = express.Router()

router.post('/:tagTitle/videos', hashtagController.getTaggedVideos)
