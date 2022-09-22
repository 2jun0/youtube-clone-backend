import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm'
import { Channel, CommunityPost, Video } from '.'

@Entity({ name: 'comments' })
@Check(
  'COALESCE((video_id)::BOOLEAN::INTEGER, 0) \
  + \
  COALESCE((post_id)::BOOLEAN::INTEGER, 0) \
  = 1'
)
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ length: 500 })
  contents: string

  @ManyToOne(() => Channel, { nullable: false, cascade: ['remove'] })
  @JoinColumn({ name: 'channel_id' })
  channel: Channel

  @ManyToOne(() => Comment, { cascade: ['remove'] })
  @JoinColumn({ name: 'ref_comment_id' })
  refComment: Comment

  @ManyToOne(() => Comment, { cascade: ['remove'] })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: Comment

  @ManyToOne(() => Video, { cascade: ['remove'] })
  @JoinColumn({ name: 'video_id' })
  video: Video

  @ManyToOne(() => CommunityPost, { cascade: ['remove'] })
  @JoinColumn({ name: 'post_id' })
  post: CommunityPost
}
