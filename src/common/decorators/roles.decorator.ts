import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles' as const;

export const Roles = (...roles: Role[]) => {
  // Perform any custom logic with roles here
  const modifiedRoles = [...new Set(roles)];

  return SetMetadata(ROLES_KEY, modifiedRoles);
};
