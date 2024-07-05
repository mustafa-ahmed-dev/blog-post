// src/auth/role-or-ownership-guard.factory.ts
import { Type, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Reflector } from '@nestjs/core';

import { OwnershipGuard } from '../guards/ownership.guard';
import { RolesGuard } from '../guards/roles.guard';

import { JwtPayload } from '@/auth/types/jwt-payload';

export function RoleOrOwnershipGuardFactory(
  allowedRoles: Role[] = [],
): Type<CanActivate> {
  return class RoleOrOwnershipGuard implements CanActivate {
    private reflector: Reflector;
    private ownershipGuard: OwnershipGuard;
    private rolesGuard: RolesGuard;

    constructor() {
      this.reflector = new Reflector();
      this.ownershipGuard = new OwnershipGuard();
      this.rolesGuard = new RolesGuard(this.reflector);

      allowedRoles = [...new Set(allowedRoles)];
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user as JwtPayload;

      // Check if the user has an allowed role
      const hasRole = allowedRoles.includes(user.role);
      if (hasRole) {
        return this.rolesGuard.canActivate(context);
      }

      // Check ownership
      return this.ownershipGuard.canActivate(context);
    }
  };
}
