import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';

import { CreateInteractionDto } from './create-interaction.dto';

import { IsID } from '@/common/decorators/is-id.decorator';
import { Page } from '@/common/decorators/pagination/page.decorator';
import { Limit } from '@/common/decorators/pagination/limit.decorator';

// import { PaginationDto } from '@/common/dto/pagination.dto';

export class FilterInteractionDto extends PartialType(CreateInteractionDto) {
  @IsOptional()
  @IsID()
  userId?: number;
}

export class FilterInteractionDtoWithPagination extends FilterInteractionDto {
  @Page()
  limit: number = 10;

  @Limit()
  page: number = 1;
}
