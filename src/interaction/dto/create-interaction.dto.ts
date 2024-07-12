import { IsNotEmpty } from 'class-validator';

import { IsID } from '@/common/decorators/is-id.decorator';

export class CreateInteractionDto {
  @IsNotEmpty()
  @IsID()
  blogId!: number;

  @IsNotEmpty()
  @IsID()
  interactionTypeId!: number;
}
