import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateInteractionDto } from './create-interaction.dto';

export class UpdateInteractionDto extends PartialType(
  OmitType(CreateInteractionDto, ['blogId']),
) {}
