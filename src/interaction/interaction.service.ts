import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';

import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import {
  FilterInteractionDto,
  FilterInteractionDtoWithPagination,
} from './dto/filter-interaction.dto';

import { InteractionsGroupedByType } from './types/interactions-grouped-by-type';

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

  findAll(filters?: FilterInteractionDtoWithPagination) {
    const { page, limit, ...where } = filters;

    const pagination = {
      page,
      limit,
      includePageCount: true,
    };

    return this.prismaService.client.blogInteraction
      .paginate({ where })
      .withPages(pagination);
  }

  groupInteractionsByType(
    blogId: number,
  ): Promise<InteractionsGroupedByType[]> {
    return this.prismaService.client.$queryRaw`
      SELECT
        interactions.interaction_type_id AS id,
        interaction_types.name,
        interaction_types.interaction,
        COUNT(interaction_types.interaction) 
      FROM blog_interactions AS interactions
      JOIN interaction_types
        ON interaction_types.id = interactions.interaction_type_id
      WHERE blog_id = ${blogId}
      GROUP BY interactions.interaction_type_id, interaction_types.name, interaction_types.interaction
    `;
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
