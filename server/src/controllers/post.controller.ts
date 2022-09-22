import { AppDataSource } from '../database/dataSource'
import { Account, CommunityPost } from '../database/entities'
import {
  CommentRespository,
  HashtagRepository,
  LikeRepository,
} from '../repositories'
import { middleware } from '../middlewares/middleware'

const communityPostRepository = AppDataSource.getRepository(CommunityPost)

export const createPost: middleware = async (req, res, next) => {
  try {
    const post = communityPostRepository.create(req.body)
    const savedPost = await communityPostRepository.save(post)
    res.send(savedPost)
  } catch (err) {
    console.error(err)
  }
}

export const updatePost: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    await communityPostRepository.update(postId, req.body)
  } catch (err) {
    console.error(err)
  }
}

export const deletePost: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    await communityPostRepository.delete(postId)
  } catch (err) {
    console.error(err)
  }
}

export const getPost: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const post = await communityPostRepository.findOneBy({ id: postId })
    return res.send(post)
  } catch (err) {
    console.error(err)
  }
}

export const createComment: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const contents = req.body.contents
    const savedComment = await CommentRespository.saveForPost(postId, contents)
    res.send(savedComment)
  } catch (err) {
    console.error(err)
  }
}

export const getComments: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const comments = await CommentRespository.findByPostId(postId)
    res.send(comments)
  } catch (err) {
    console.error(err)
  }
}

/** TODO: jwt 하고 나서 씀 */
export const likePost: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const isLike = req.body.isLike as unknown as boolean
  } catch (err) {
    console.error(err)
  }
}

/** TODO: jwt 하고 나서 씀 */
export const unlikePost: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const isLike = req.query.isLike as unknown as boolean
  } catch (err) {
    console.error(err)
  }
}

export const getLikeCount: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const isLike = req.query.isLike as unknown as boolean

    const count = await LikeRepository.countByPostId(postId, isLike)
    res.send({ count })
  } catch (err) {
    console.error(err)
  }
}

export const addTag: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const title = req.body.title
    await HashtagRepository.addHashtagInPost(title, postId)
  } catch (err) {
    console.error(err)
  }
}

export const getTags: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const hashtags = await HashtagRepository.getOnlyHashtagsInPost(postId)

    res.send({
      titles: hashtags.map(hashtag => hashtag.title),
    })
  } catch (err) {
    console.error(err)
  }
}

export const deleteTag: middleware = async (req, res, next) => {
  try {
    const postId = req.params.postId as unknown as number
    const tagTitle = req.params.tagTitle

    await HashtagRepository.deleteHashtagForPost(postId, tagTitle)
  } catch (err) {
    console.error(err)
  }
}
