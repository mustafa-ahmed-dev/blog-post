import { Prisma, PrismaClient } from '@prisma/client';
import pagination from 'prisma-extension-pagination';

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

        findByIdentifier: async (identifier: string | number) => {
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
