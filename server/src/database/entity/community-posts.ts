import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Channel } from './channel'
import { HashtagsForPost } from './relationship'

@Entity({ name: 'community_posts' })
export class CommunityPost {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('text')
  contents: string

  @Column({ length: 240 })
  imgUrl: string

  @ManyToOne(() => Channel, { nullable: false, cascade: ['remove'] })
  @JoinColumn({ name: 'channel_id' })
  channel: Channel

  @OneToMany(() => HashtagsForPost, hashtagsForPost => hashtagsForPost.post)
  hashtagsForPost: HashtagsForPost[]
}
