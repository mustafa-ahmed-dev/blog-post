import { Prisma } from '@prisma/client';

export const getUserSelect = (includePassword: boolean = false) => {
  const USER_SELECT = {
    id: true,
    username: true,
    email: true,
    isActive: true,
    role: true,
    details: {
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        dateOfBirth: true,
        imageId: true,
      },
    },
  } as Prisma.UserSelect;

  return {
    ...USER_SELECT,
    password: includePassword,
  };
};
