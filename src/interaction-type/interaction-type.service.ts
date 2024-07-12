import { Inject, Injectable } from '@nestjs/common';
import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';
import { CustomPrismaService } from 'nestjs-prisma';

import { CreateInteractionTypeDto } from './dto/create-interaction-type.dto';
import { UpdateInteractionTypeDto } from './dto/update-interaction-type.dto';

@Injectable()
export class InteractionTypeService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  create(dto: CreateInteractionTypeDto) {
    return this.prismaService.client.interactionType.create({
      data: dto,
    });
  }

  findAll() {
    const pagination = {
      page: 1,
      limit: 10,
      includePageCount: true,
    };

    return this.prismaService.client.interactionType
      .paginate()
      .withPages(pagination);
  }

  findOne(id: number) {
    return this.prismaService.client.interactionType.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdateInteractionTypeDto) {
    return this.prismaService.client.interactionType.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prismaService.client.interactionType.delete({
      where: { id },
    });
  }
}
