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

export const getUserProfileSelect = () => {
  const USER_PROFILE: Prisma.UserSelect = {
    username: true,
    email: true,
    isActive: true,
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
    blogs: {
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        text: true,
        createdAt: true,
      },
    },
  } as Prisma.UserSelect;

  return USER_PROFILE;
};
