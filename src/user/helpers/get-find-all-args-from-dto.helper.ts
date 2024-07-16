import { Prisma } from '@prisma/client';
import { OmitType } from '@nestjs/mapped-types';

import { UserFiltersDto } from '../dto/filter-user.dto';

class Args extends OmitType(UserFiltersDto, ['limit', 'page']) {}

export const getFindAllArgsFromDto = (dto: Args) => {
  const { name, username, email, dateOfBirth } = dto;

  let filters: Prisma.UserWhereInput = {};

  if (name) {
    filters.details = {
      ...filters.details,
      OR: [
        {
          firstName: {
            contains: name,
            mode: 'insensitive',
          },
        },
        {
          middleName: {
            contains: name,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: name,
            mode: 'insensitive',
          },
        },
      ],
    } as Prisma.UserWhereInput['details'];
  }

  if (dateOfBirth) {
    filters.details = {
      ...filters.details,
      dateOfBirth,
    } as Prisma.UserWhereInput['details'];
  }

  if (username) {
    filters = {
      ...filters,
      username: {
        contains: username,
        mode: 'insensitive',
      },
    };
  }

  if (email) {
    filters = {
      ...filters,
      email: {
        contains: email,
        mode: 'insensitive',
      },
    };
  }

  const data: Prisma.UserFindManyArgs = {
    where: filters,
    select: {
      id: true,
      username: true,
      email: true,
      isActive: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      details: {
        select: {
          firstName: true,
          middleName: true,
          lastName: true,
          dateOfBirth: true,
          imageId: true,
        },
      },
    },
  };

  return data;
};
