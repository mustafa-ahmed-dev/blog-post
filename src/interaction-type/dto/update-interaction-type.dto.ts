import { PartialType } from '@nestjs/swagger';
import { CreateInteractionTypeDto } from './create-interaction-type.dto';

export class UpdateInteractionTypeDto extends PartialType(CreateInteractionTypeDto) {}
