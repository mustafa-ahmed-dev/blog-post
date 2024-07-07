import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { Prisma, Role } from '@prisma/client';

import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { mapCreateUserData } from './mappers/create-user-data.mapper';
import { mapUpdateUserData } from './mappers/update-user-data.mapper';
import { getUserProfileSelect } from '@/common/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  create(dto: CreateUserDto) {
    const data = mapCreateUserData(dto);

    return this.prismaService.client.user.create({
      data,
      include: {
        details: true,
      },
    });
  }

  findAll(page: number = 1, limit: number = 10) {
    return this.prismaService.client.user
      .paginate({
        include: {
          details: true,
        },
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }

  findOne(id: number, select?: Prisma.UserSelect | null) {
    return this.prismaService.client.user.findUniqueOrThrow({
      where: { id },
      select,
    });
  }

  update(id: number, dto: UpdateUserDto) {
    const data = mapUpdateUserData(dto);

    return this.prismaService.client.user.update({
      where: { id },
      data,
      include: {
        details: true,
      },
    });
  }

  updatePassword(id: number, password: string) {
    return this.prismaService.client.user.update({
      where: { id },
      data: { password },
      include: {
        details: true,
      },
    });
  }

  updateEmail(id: number, email: string) {
    return this.prismaService.client.user.update({
      where: { id },
      data: { email },
      include: {
        details: true,
      },
    });
  }

  updateRole(id: number, role: Role) {
    return this.prismaService.client.user.update({
      where: { id },
      data: { role },
      include: {
        details: true,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.client.user.delete({
      where: { id },
      include: {
        details: true,
      },
    });
  }
}
