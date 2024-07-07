import { Prisma, PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';
import { LoginType } from './types/login.type';

export const extendedPrismaClient = new PrismaClient({
  log: ['info', 'query', 'error', 'warn'],
  errorFormat: 'pretty',
})
  .$extends({
    model: {
      user: {
        findByEmail: async (email: string) => {
          return extendedPrismaClient.user.findUnique({
            where: { email },
            include: {
              details: true,
            },
          });
        },

        findByUsername: async (username: string) => {
          return extendedPrismaClient.user.findUnique({
            where: { username },
            include: {
              details: true,
            },
          });
        },

        findForLogin: (username: string): Promise<LoginType> => {
          const select: Prisma.UserSelect = {
            id: true,
            username: true,
            email: true,
            role: true,
            password: true,
          };

          // to check if it is an email
          if (username.includes('@')) {
            return extendedPrismaClient.user.findUniqueOrThrow({
              where: {
                email: username,
              },
              select,
            });
          }

          return extendedPrismaClient.user.findUniqueOrThrow({
            where: { username },
            select,
          });
        },

        findByIdentifier: async (
          identifier: string | number,
          select?: Prisma.UserSelect | null,
        ) => {
          if (typeof identifier === 'number') {
            return extendedPrismaClient.user.findUniqueOrThrow({
              where: {
                id: identifier,
              },
              include: {
                details: true,
              },
            });
          }

          // to check if it is an email
          if (identifier.includes('@')) {
            return extendedPrismaClient.user.findUniqueOrThrow({
              where: {
                email: identifier,
              },
              include: {
                details: true,
              },
            });
          }

          return extendedPrismaClient.user.findUniqueOrThrow({
            where: {
              username: identifier,
            },
            include: {
              details: true,
            },
          });
        },
      },
    },
  })
  .$extends(
    pagination({
      pages: {
        includePageCount: true,
        limit: 10,
      },
    }),
  );

export type ExtendedPrismaClient = typeof extendedPrismaClient;
