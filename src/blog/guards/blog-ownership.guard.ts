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
export class BlogOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;

    const _authorId: string | null | undefined = request.body?.authorId;

    if (!_authorId) return true;

    const authorId = parseInt(_authorId, 10);
    const user = request.user as JwtPayload;

    if (user.id !== authorId)
      throw new ForbiddenException(
        "You don't have the permissions to access the resource",
      );

    return true;
  }
}
