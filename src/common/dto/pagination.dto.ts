import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsInt, Min, Max } from 'class-validator';

import { Limit } from '../decorators/pagination/limit.decorator';
import { Page } from '../decorators/pagination/page.decorator';

export class PaginationDto {
  @Page()
  page?: number = 1;

  @Limit()
  limit?: number = 10;
}
