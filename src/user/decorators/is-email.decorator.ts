import {
  IsString,
  IsEmail as IsEmailValidationDecorator,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { applyDecorators } from '@nestjs/common';

export function IsEmail() {
  return applyDecorators(
    IsString(),
    Length(1, 100),
    Transform(({ value }: { value: string }) => value.toLowerCase()),
    IsEmailValidationDecorator(),
  );
}
