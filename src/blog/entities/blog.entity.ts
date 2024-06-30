import { BlogType } from '@prisma/client';

export class BlogEntity {
  id: number;
  title: string;
  description: string;
  text: string;
  type: BlogType;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
}
