import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';

import { InteractionService } from './interaction.service';

import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { UserId } from '@/common/decorators/user-id.decorator';
import { InteractionOwnershipGuard } from './guards/interaction-ownership.guard';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateInteractionDto, @UserId() userId: number) {
    return this.interactionService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.interactionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.interactionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, InteractionOwnershipGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateInteractionDto,
  ) {
    return this.interactionService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, InteractionOwnershipGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.interactionService.remove(id);
  }
}
