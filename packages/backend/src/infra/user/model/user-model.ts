import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn
} from 'typeorm'
import { PrimaryUuidColumn } from '../../@shared/types/decorators'

@Entity('user')
export default class userModel extends BaseEntity {
  @PrimaryUuidColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
