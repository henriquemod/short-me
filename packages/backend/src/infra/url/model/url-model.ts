import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn
} from 'typeorm'
import { PrimaryUuidColumn } from '../../@shared/types/decorators'

@Entity('url')
export default class urlModel extends BaseEntity {
  @PrimaryUuidColumn()
  id: string

  @Column()
  url: string

  @Column()
  key: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
