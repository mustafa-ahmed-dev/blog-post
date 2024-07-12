// src/auth/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload } from '@/auth/classes/jwt-payload';

@Injectable()
export class InteractionOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;

    const _userId: string | null | undefined = request.body?.userId;

    if (!_userId) return true;

    const userId = parseInt(_userId, 10);
    const user = request.user as JwtPayload;

    if (user.id !== userId)
      throw new ForbiddenException(
        "You don't have the permissions to access the resource",
      );

    return true;
  }
}
