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
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InteractionService } from './interaction.service';

import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { FilterInteractionDtoWithPagination } from './dto/filter-interaction.dto';

import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { InteractionOwnershipGuard } from './guards/interaction-ownership.guard';

import { UserId } from '@/common/decorators/user-id.decorator';

import { InteractionErrorsInterceptor } from './interceptors/interaction-errors.interceptor';

@ApiTags('interactions')
@Controller('interactions')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(InteractionErrorsInterceptor)
  @Post()
  create(@Body() dto: CreateInteractionDto, @UserId() userId: number) {
    return this.interactionService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() dto: FilterInteractionDtoWithPagination) {
    return this.interactionService.findAll(dto);
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
