import { AppDataSource } from '../database/data-source'
import { Comment, CommunityPost, Video } from '../database/entity'

const commentRepository = AppDataSource.getRepository(Comment)
const videoRepository = AppDataSource.getRepository(Video)
const communityPostRepository = AppDataSource.getRepository(CommunityPost)

export const CommentRespository = commentRepository.extend({
  async findByVideoId(videoId: Video['id']) {
    return commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.video', 'video')
      .where('video.id = :videoId', { videoId })
      .getMany()
  },

  async findByPostId(postId: CommunityPost['id']) {
    return commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.post', 'communityPost')
      .where('communityPost.id = :postId', { postId })
      .getMany()
  },

  async saveForVideo(videoId: Video['id'], contents: Comment['contents']) {
    const video = await videoRepository.findOneBy({ id: videoId })
    const comment = commentRepository.create({ contents, video })
    const savedComment = await commentRepository.save(comment)
    // Refer to itself
    savedComment.refComment = savedComment
    return commentRepository.save(savedComment)
  },

  async saveForPost(
    postId: CommunityPost['id'],
    contents: Comment['contents']
  ) {
    const post = await communityPostRepository.findOneBy({ id: postId })
    const comment = commentRepository.create({ contents, post })
    const savedComment = await commentRepository.save(comment)
    // Refer to itself
    savedComment.refComment = savedComment
    return commentRepository.save(savedComment)
  },

  async saveForComment(
    commentId: Comment['id'],
    contents: Comment['contents']
  ) {
    const parentComment = await commentRepository.findOneBy({ id: commentId })
    const comment = commentRepository.create({ contents, parentComment })
    return commentRepository.save(comment)
  },
})
