import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';

import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';

import { InteractionService } from '@/interaction/interaction.service';

import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogWithoutAuthorDto } from './dto/create-blog-without-author.dto';

@Injectable()
export class BlogService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly interactionService: InteractionService,
  ) {}

  create(dto: CreateBlogWithoutAuthorDto, authorId: number) {
    return this.prismaService.client.blog.create({
      data: {
        ...dto,
        authorId,
      },
    });
  }

  findAll() {
    const pagination = {
      page: 1,
      limit: 10,
      includePageCount: true,
    };

    return this.prismaService.client.blog.paginate().withPages(pagination);
  }

  countInteractions(id: number) {
    this.prismaService.client.$queryRaw`
      SELECT
        interaction_type as interactionType,
        COUNT(*)
      WHERE blog_id = ${id},
      GROUP BY interactionType
    `;
  }

  async findOne(id: number) {
    const blog = await this.prismaService.client.blog.findUnique({
      where: { id },
    });

    const interactions =
      await this.interactionService.groupInteractionsByType(id);

    return {
      ...blog,
      interactions,
    };
  }

  update(id: number, dto: UpdateBlogDto) {
    return this.prismaService.client.blog.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prismaService.client.blog.delete({
      where: { id },
    });
  }
}
