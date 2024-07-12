import { Module } from '@nestjs/common';
import { InteractionTypeService } from './interaction-type.service';
import { InteractionTypeController } from './interaction-type.controller';

@Module({
  controllers: [InteractionTypeController],
  providers: [InteractionTypeService],
})
export class InteractionTypeModule {}
