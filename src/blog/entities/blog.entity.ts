import { BlogType } from '@prisma/client';
import { Expose } from 'class-transformer';

export class BlogEntity {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  text: string;

  @Expose()
  type: BlogType;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  authorId: number;
}
