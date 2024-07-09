import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

export function IsUsername() {
  return applyDecorators(
    IsString(),
    Length(1, 35),
    Transform(({ value }: { value: string }) => value.toLowerCase()),
    Matches(/^[a-z]/, {
      message: 'Username must begin with a letter',
    }),
    Matches(/^[a-z][a-z0-9\-\.]+$/, {
      message: 'Invalid Username',
    }),
  );
}
