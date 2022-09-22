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
import { Channel } from '.'
import { HashtagsForVideo } from './relationship'

@Entity({ name: 'videos' })
export class Video {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ length: 50, nullable: false })
  title: string

  @Column({ default: 0 })
  viewsCnt: number

  @Column('text')
  description: string

  @Column({ nullable: false })
  len: number

  @Column({ length: 240, nullable: false })
  thumbnailUrl: string

  @ManyToOne(() => Channel, { nullable: false, cascade: ['remove'] })
  @JoinColumn({ name: 'channel_id' })
  channel: Channel

  @OneToMany(() => HashtagsForVideo, hashtagsForVideo => hashtagsForVideo.video)
  hashtagsForVideo: HashtagsForVideo[]
}
