import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

export const Roles = (roles: Role[]) => {
  roles = [...new Set(roles)];

  return SetMetadata(ROLES_KEY, roles);
};
