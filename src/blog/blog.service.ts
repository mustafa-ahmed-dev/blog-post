import { Inject, Injectable } from '@nestjs/common';
import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';
import { CustomPrismaService } from 'nestjs-prisma';

import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  create(dto: CreateBlogDto) {
    return this.prismaService.client.blog.create({
      data: dto,
    });
  }

  findAll() {
    return this.prismaService.client.blog.paginate();
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
