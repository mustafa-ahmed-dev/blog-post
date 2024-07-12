import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { InteractionTypeService } from './interaction-type.service';

import { CreateInteractionTypeDto } from './dto/create-interaction-type.dto';
import { UpdateInteractionTypeDto } from './dto/update-interaction-type.dto';

import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

import { Roles } from '@/common/decorators/roles.decorator';

import { managerialRoles } from '@/common/constants/user-roles.constant';

@Controller('interaction-types')
export class InteractionTypeController {
  constructor(
    private readonly interactionTypeService: InteractionTypeService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(managerialRoles)
  @Post()
  create(@Body() dto: CreateInteractionTypeDto) {
    return this.interactionTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.interactionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.interactionTypeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(managerialRoles)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInteractionTypeDto,
  ) {
    return this.interactionTypeService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(managerialRoles)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interactionTypeService.remove(id);
  }
}
