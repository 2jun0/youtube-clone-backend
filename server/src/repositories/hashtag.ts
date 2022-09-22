import { AppDataSource } from '../database/dataSource'
import { CommunityPost, Hashtag, Video } from '../database/entities'
import {
  HashtagsForPost,
  HashtagsForVideo,
} from '../database/entities/relationship'

const hashtagRepository = AppDataSource.getRepository(Hashtag)
const videoRepository = AppDataSource.getRepository(Video)
const communityPostRepository = AppDataSource.getRepository(CommunityPost)
const hashtagsForVideoRespository =
  AppDataSource.getRepository(HashtagsForVideo)
const hashtagsForPostRespository = AppDataSource.getRepository(HashtagsForPost)

export const HashtagRepository = hashtagRepository.extend({
  async addHashtagInVideo(title: Hashtag['title'], videoId: Video['id']) {
    let hashtag = await hashtagRepository.findOneBy({ title })

    if (!hashtag) {
      hashtag = hashtagRepository.create({ title })
      hashtag = await hashtagRepository.save(hashtag)
    }

    const video = await videoRepository.findOneBy({ id: videoId })

    const hashtagsForVideo = hashtagsForVideoRespository.create({
      hashtag,
      video,
    })
    return await hashtagsForVideoRespository.save(hashtagsForVideo)
  },

  async addHashtagInPost(title: Hashtag['title'], postId: CommunityPost['id']) {
    let hashtag = await hashtagRepository.findOneBy({ title })

    if (!hashtag) {
      hashtag = hashtagRepository.create({ title })
      hashtag = await hashtagRepository.save(hashtag)
    }

    const post = await communityPostRepository.findOneBy({ id: postId })

    const hashtagsForPost = hashtagsForPostRespository.create({
      hashtag,
      post,
    })
    return await hashtagsForPostRespository.save(hashtagsForPost)
  },

  /** Hashtags model을 배열로 가져온다.
   * - hashtags엔 hashtagsForVideo 객체를 가져오지 않는다.
   */
  async getOnlyHashtagsInVideo(videoId: Video['id']) {
    return await hashtagRepository
      .createQueryBuilder('hashtag')
      .leftJoin('hashtag.hashtagsForVideo', 'hashtagsForVideo')
      .innerJoin('hashtagsForVideo.video', 'video')
      .where('video.id = :videoId', { videoId })
      .getMany()
  },

  /** Hashtags model을 배열로 가져온다.
   * - hashtags엔 hashtagsForPost 객체를 가져오지 않는다.
   */
  async getOnlyHashtagsInPost(postId: CommunityPost['id']) {
    return await hashtagRepository
      .createQueryBuilder('hashtag')
      .leftJoin('hashtag.hashtagsForPost', 'hashtagsForPost')
      .innerJoin('hashtagsForPost.post', 'communityPost')
      .where('communityPost.id = :postId', { postId })
      .getMany()
  },

  /** Hashtag model을 하나 가져온다.
   * - hashtagsForVideo와
   * - video도 가져온다.
   */
  async getHashtagByTitle(title: Hashtag['title']) {
    return await hashtagRepository
      .createQueryBuilder('hashtag')
      .leftJoinAndSelect('hashtag.hashtagsForVideo', 'hashtagsForVideo')
      .leftJoinAndSelect('hashtagsForVideo.video', 'video')
      .where('hashtag.title = :title', { title })
      .getOne()
  },

  async deleteHashtagForVideo(videoId: Video['id'], title: Hashtag['title']) {
    const hashtagsForVideo = await hashtagsForVideoRespository
      .createQueryBuilder('hastagsForVideo')
      .innerJoin('hastagsForVideo.video', 'video')
      .innerJoin('hastagsForVideo.hashtag', 'hashtag')
      .where('video.id = :videoId', { videoId })
      .andWhere('hashtag.title = :tagtitle', { tagTitle: title })
      .getOne()

    return await hashtagsForVideoRespository.delete(hashtagsForVideo)
  },

  async deleteHashtagForPost(
    postId: CommunityPost['id'],
    title: Hashtag['title']
  ) {
    const hashtagsForPost = await hashtagsForPostRespository
      .createQueryBuilder('hastagsForPost')
      .innerJoin('hastagsForPost.post', 'post')
      .innerJoin('hastagsForPost.hashtag', 'hashtag')
      .where('communityPost.id = :postId', { postId })
      .andWhere('hashtag.title = :tagtitle', { tagTitle: title })
      .getOne()

    return await hashtagsForPostRespository.delete(hashtagsForPost)
  },
})
