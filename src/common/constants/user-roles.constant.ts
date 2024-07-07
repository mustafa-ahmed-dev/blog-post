import { Role } from '@prisma/client';

export const managerialRoles = [
  ...new Set([Role.SuperAdmin, Role.Admin, Role.Moderator]),
];

export const admins = [...new Set([Role.SuperAdmin, Role.Admin])];
