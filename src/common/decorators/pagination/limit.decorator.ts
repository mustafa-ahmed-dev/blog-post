import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsInt, Min, Max, max } from 'class-validator';
import { Transform } from 'class-transformer';

export function Limit() {
  const minimum: number = 1,
    maximum: number = 100,
    limit: number = 10;

  return applyDecorators(
    ApiPropertyOptional({
      description: 'Number of users per page for pagination',
      default: limit,
      minimum,
      maximum,
    }),
    IsOptional(),
    Transform(({ value }) => parseInt(value, limit)),
    IsNumber(),
    IsInt(),
    Min(minimum),
    Max(maximum),
  );
}
