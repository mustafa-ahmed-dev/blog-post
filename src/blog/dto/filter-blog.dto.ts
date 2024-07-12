import { OmitType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class FilterBlogDto extends OmitType(CreateBlogDto, ['description']) {}
