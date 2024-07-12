import { Inject, Injectable } from '@nestjs/common';
import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';
import { CustomPrismaService } from 'nestjs-prisma';

import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogWithoutAuthorDto } from './dto/create-blog-without-author.dto';

@Injectable()
export class BlogService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
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

  findOne(id: number) {
    return this.prismaService.client.blog.findUnique({
      where: { id },
    });
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
