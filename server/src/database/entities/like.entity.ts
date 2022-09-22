import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from 'typeorm'
import { Channel, Comment, CommunityPost, Video } from '.'

@Entity({ name: 'likes' })
@Unique(['channel', 'video', 'post', 'comment'])
@Check(
  'COALESCE((video_id)::BOOLEAN::INTEGER, 0) \
  + \
  COALESCE((post_id)::BOOLEAN::INTEGER, 0) \
  + \
  COALESCE((comment_id)::BOOLEAN::INTEGER, 0) \
  = 1'
)
export class Like {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column({ default: true })
  isLike: boolean

  @ManyToOne(() => Channel, { nullable: false, cascade: ['remove'] })
  @JoinColumn({ name: 'channel_id' })
  channel: Channel

  @ManyToOne(() => Video, { cascade: ['remove'] })
  @JoinColumn({ name: 'video_id' })
  video: Video

  @ManyToOne(() => CommunityPost, { cascade: ['remove'] })
  @JoinColumn({ name: 'post_id' })
  post: CommunityPost

  @ManyToOne(() => Comment, { cascade: ['remove'] })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment
}
