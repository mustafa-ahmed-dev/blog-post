import { PartialType } from '@nestjs/mapped-types';

import { Limit } from '@/common/decorators/pagination/limit.decorator';
import { Page } from '@/common/decorators/pagination/page.decorator';

import { CreateInteractionTypeDto } from './create-interaction-type.dto';

export class FilterInteractionTypeDto extends PartialType(
  CreateInteractionTypeDto,
) {
  @Page()
  limit: number = 10;

  @Limit()
  page: number = 1;
}
