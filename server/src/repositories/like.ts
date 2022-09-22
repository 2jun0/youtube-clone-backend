import { AppDataSource } from '../database/dataSource'
import { Comment, CommunityPost, Like, Video } from '../database/entities'

const likeRepository = AppDataSource.getRepository(Like)

export const LikeRepository = likeRepository.extend({
  async countByVideoId(videoId: Video['id'], isLike: Like['isLike'] = true) {
    return likeRepository
      .createQueryBuilder('like')
      .leftJoin('like.video', 'video')
      .where('video.id = :videoId', { videoId })
      .andWhere('like.isLike = :isLike', { isLike })
      .getCount()
  },

  async countByPostId(
    postId: CommunityPost['id'],
    isLike: Like['isLike'] = true
  ) {
    return likeRepository
      .createQueryBuilder('like')
      .leftJoin('like.post', 'communityPost')
      .where('communityPost.id = :postId', { postId })
      .andWhere('like.isLike = :isLike', { isLike })
      .getCount()
  },

  async countByCommentId(
    commentId: Comment['id'],
    isLike: Like['isLike'] = true
  ) {
    return likeRepository
      .createQueryBuilder('like')
      .leftJoin('like.post', 'comment')
      .where('comment.id = :commentId', { commentId })
      .andWhere('like.isLike = :isLike', { isLike })
      .getCount()
  },
})
