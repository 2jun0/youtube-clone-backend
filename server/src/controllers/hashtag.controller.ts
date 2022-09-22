import { HashtagRepository } from '../repositories'
import { middleware } from '../middlewares/middleware'

export const getTaggedVideos: middleware = async (req, res, next) => {
  try {
    const tagTitle = req.params.tagTitle
    const hashtag = await HashtagRepository.getHashtagByTitle(tagTitle)

    const videos = hashtag.hashtagsForVideo.forEach(
      hashtagsForVideo => hashtagsForVideo.video
    )
    res.send(videos)
  } catch (err) {
    console.error(err)
  }
}
