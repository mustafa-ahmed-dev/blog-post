import { applyDecorators } from '@nestjs/common';
import { IsDate, MaxDate } from 'class-validator';
import { Transform } from 'class-transformer';

export function IsDateOfBirth() {
  return applyDecorators(
    Transform(({ value }) => new Date(value)),
    IsDate(),
    MaxDate(new Date(Date.now())),
  );
}
