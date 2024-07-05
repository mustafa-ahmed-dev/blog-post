// src/auth/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload } from '@/auth/types/jwt-payload';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;

    const userIddFromParam: string | null | undefined = request.params?.id;

    if (!userIddFromParam) return true;

    const id: number = parseInt(userIddFromParam, 10);
    const user = request.user as JwtPayload;

    if (user.id !== id)
      throw new ForbiddenException(
        "You don't have the permissions to access the resource",
      );

    return true;
  }
}
