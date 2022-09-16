import { AppDataSource } from '../database/data-source'
import { Video } from '../database/entity'
import {
  CommentRespository,
  HashtagRepository,
  LikeRepository,
} from '../repositories'
import { middleware } from '../middlewares/middleware'

const videoRepository = AppDataSource.getRepository(Video)

export const createVideo: middleware = async (req, res, next) => {
  try {
    const video = videoRepository.create(req.body)
    const savedVideo = await videoRepository.save(video)
    return res.send(savedVideo)
  } catch (err) {
    console.error(err)
  }
}

export const updateVideo: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    await videoRepository.update(videoId, req.body)
  } catch (err) {
    console.error(err)
  }
}

export const deleteVideo: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    await videoRepository.delete(videoId)
  } catch (err) {
    console.error(err)
  }
}

export const getVideo: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const video = await videoRepository.findOneBy({ id: videoId })
    return res.send(video)
  } catch (err) {
    console.error(err)
  }
}

/** TODO: use query builder to select relative videos */
export const getRelativeVideos: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
  } catch (err) {
    console.error(err)
  }
}

export const createComment: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const contents = req.body.contents
    const savedComment = await CommentRespository.saveForVideo(
      videoId,
      contents
    )
    res.send(savedComment)
  } catch (err) {
    console.error(err)
  }
}

export const getComments: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number

    const comments = await CommentRespository.findByVideoId(videoId)
    res.send(comments)
  } catch (err) {
    console.error(err)
  }
}

/** TODO: jwt 하고 나서 씀 */
export const likeVideo: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const isLike = req.body.isLike as unknown as boolean
  } catch (err) {
    console.error(err)
  }
}

/** TODO: jwt 하고 나서 씀 */
export const unlikeVideo: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const isLike = req.query.isLike as unknown as boolean
  } catch (err) {
    console.error(err)
  }
}

export const getLikeCount: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const isLike = req.query.isLike as unknown as boolean

    const count = await LikeRepository.countByVideoId(videoId, isLike)
    res.send({ count })
  } catch (err) {
    console.error(err)
  }
}

export const addTag: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const title = req.body.title
    await HashtagRepository.addHashtagInVideo(title, videoId)
  } catch (err) {
    console.error(err)
  }
}

export const getTags: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const hashtags = await HashtagRepository.getOnlyHashtagsInVideo(videoId)

    res.send({
      titles: hashtags.map(hashtag => hashtag.title),
    })
  } catch (err) {
    console.error(err)
  }
}

export const deleteTag: middleware = async (req, res, next) => {
  try {
    const videoId = req.params.videoId as unknown as number
    const tagTitle = req.params.tagTitle

    await HashtagRepository.deleteHashtagForVideo(videoId, tagTitle)
  } catch (err) {
    console.error(err)
  }
}
