import { Prisma } from '@prisma/client';

import { UpdateUserDto } from '../dto/update-user.dto';

export const mapUpdateUserData = (
  dto: UpdateUserDto,
): Prisma.UserUpdateInput => {
  const { username, ...details } = dto;

  return {
    username,
    details: {
      update: details,
    },
  };
};
