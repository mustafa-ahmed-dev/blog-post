import { OmitType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class CreateBlogWithoutAuthorDto extends OmitType(CreateBlogDto, [
  'authorId',
]) {}
