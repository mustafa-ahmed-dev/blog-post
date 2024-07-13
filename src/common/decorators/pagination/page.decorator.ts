import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export function Page() {
  const minimum: number = 1,
    limit: number = 1;

  return applyDecorators(
    ApiPropertyOptional({
      description: 'Page number for pagination',
      default: limit,
      minimum,
    }),
    IsOptional(),
    Transform(({ value }) => parseInt(value, 10)),
    IsNumber(),
    IsInt(),
    Min(minimum),
  );
}
