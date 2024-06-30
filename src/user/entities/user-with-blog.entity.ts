import { Expose, Type } from 'class-transformer';

import { UserEntity } from './user.entity';
import { BlogEntity } from '@/blog/entities/blog.entity';

export class UserWithBlogsEntity extends UserEntity {
  @Expose()
  @Type(() => BlogEntity)
  blogs: BlogEntity[];
}
