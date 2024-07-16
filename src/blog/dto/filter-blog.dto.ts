import { OmitType } from '@nestjs/mapped-types';

import { Page } from '@/common/decorators/pagination/page.decorator';
import { Limit } from '@/common/decorators/pagination/limit.decorator';

import { CreateBlogDto } from './create-blog.dto';
export class FilterBlogDto extends OmitType(CreateBlogDto, ['description']) {
  @Page()
  limit: number = 10;

  @Limit()
  page: number = 1;
}
