import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';

import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Injectable()
export class InteractionService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  create(dto: CreateInteractionDto, userId: number) {
    return this.prismaService.client.blogInteraction.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  findAll() {
    const pagination = {
      page: 1,
      limit: 10,
      includePageCount: true,
    };

    return this.prismaService.client.blogInteraction
      .paginate()
      .withPages(pagination);
  }

  findOne(id: string) {
    return this.prismaService.client.blogInteraction.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateInteractionDto) {
    return this.prismaService.client.blogInteraction.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prismaService.client.blogInteraction.delete({
      where: { id },
    });
  }
}
