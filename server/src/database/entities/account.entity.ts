import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ length: 40, unique: true })
  email: string

  @Column({ length: 30, nullable: false })
  password: string

  @Column({ length: 10, nullable: false })
  firstName: string

  @Column({ length: 10, nullable: false })
  lastName: string
}
