import * as typeorm from 'typeorm'
import { v4 as uuid } from 'uuid'

export function PrimaryUuidColumn(): PropertyDecorator {
  return typeorm.PrimaryColumn('uuid', { nullable: false, default: uuid() })
}
