import { Prisma } from '@prisma/client';
import { OmitType } from '@nestjs/mapped-types';

import { UserFiltersDto } from '../dto/filter-user.dto';

class Args extends OmitType(UserFiltersDto, ['limit', 'page']) {}

export const getFindAllArgsFromDto = (args: Args) => {
  const { name, username, email, dateOfBirth } = args;

  const filters: Prisma.UserWhereInput = {};

  filters.details = {
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
    dateOfBirth,
  };

  filters.username = {
    contains: username,
    mode: 'insensitive',
  };

  filters.email = {
    contains: email,
    mode: 'insensitive',
  };

  const data: Prisma.UserFindManyArgs = {
    where: filters,
    select: {
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
