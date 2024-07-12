import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, Min } from 'class-validator';

export function IsID() {
  return applyDecorators(
    Transform(({ value }: { value: string }) => parseInt(value, 10), {
      toClassOnly: true,
    }),
    IsNumber(),
    IsInt(),
    Min(1),
  );
}
