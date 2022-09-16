import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
  Column,
} from 'typeorm'
import { Channel } from '../channel'

@Entity({ name: 'subscribe' })
@Unique(['subscriberId', 'subscribingId'])
@Check('subscriber_id <> subscribing_id')
export class Subscribe {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column({ nullable: false })
  subscriberId: number

  @Column({ nullable: false })
  subscribingId: number

  @ManyToOne(() => Channel, { cascade: ['remove'], nullable: false })
  @JoinColumn({ name: 'subscriberId' })
  subscriber: Channel

  @ManyToOne(() => Channel, { cascade: ['remove'], nullable: false })
  @JoinColumn({ name: 'subscribingId' })
  subscribing: Channel
}
