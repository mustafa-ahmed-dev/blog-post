import { Prisma } from '@prisma/client';

import { CreateUserDto } from '../dto/create-user.dto';

export const mapCreateUserData = (
  dto: CreateUserDto,
): Prisma.UserCreateInput => {
  const { email, username, password, role, ...details } = dto;

  return {
    username,
    email,
    password,
    role,
    details: {
      create: details,
    },
  };
};
