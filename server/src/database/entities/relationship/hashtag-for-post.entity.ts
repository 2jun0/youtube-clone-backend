import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm'
import { CommunityPost, Hashtag } from '..'

@Entity({ name: 'hashtags_for_post' })
@Unique(['hashtag', 'post'])
export class HashtagsForPost {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Hashtag, hashtag => hashtag.hashtagsForPost, {
    cascade: ['remove'],
    nullable: false,
  })
  @JoinColumn({ name: 'hashtag_id' })
  hashtag: Hashtag

  @ManyToOne(() => CommunityPost, post => post.hashtagsForPost, {
    cascade: ['remove'],
    nullable: false,
  })
  @JoinColumn({ name: 'post_id' })
  post: CommunityPost
}
