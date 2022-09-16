import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { HashtagsForVideo, HashtagsForPost } from './relationship'

@Entity({ name: 'hashtags' })
export class Hashtag {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column({ length: 20, nullable: false, unique: true })
  title: string

  @OneToMany(() => HashtagsForVideo, hashtagForVideo => hashtagForVideo.hashtag)
  hashtagsForVideo: HashtagsForVideo[]

  @OneToMany(() => HashtagsForPost, hashtagForPost => hashtagForPost.hashtag)
  hashtagsForPost: HashtagsForPost[]
}
