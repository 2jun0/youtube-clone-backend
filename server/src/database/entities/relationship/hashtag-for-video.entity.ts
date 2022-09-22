import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm'
import { Video, Hashtag } from '..'

@Entity({ name: 'hashtags_for_video' })
@Unique(['hashtag', 'video'])
export class HashtagsForVideo {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Hashtag, hashtag => hashtag.hashtagsForVideo, {
    cascade: ['remove'],
    nullable: false,
  })
  @JoinColumn({ name: 'hashtag_id' })
  hashtag: Hashtag

  @ManyToOne(() => Video, video => video.hashtagsForVideo, {
    cascade: ['remove'],
    nullable: false,
  })
  @JoinColumn({ name: 'video_id' })
  video: Video
}
