import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Account } from '.'

@Entity({ name: 'channels' })
export class Channel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ length: 40, nullable: false })
  name: string

  @Column('text', { nullable: false })
  description: string

  @ManyToOne(() => Account, { cascade: ['remove'] })
  @JoinColumn({ name: 'account_id' })
  account: Account
}
