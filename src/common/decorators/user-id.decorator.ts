import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload } from '@/auth/classes/jwt-payload';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;

    if (!user || !user.id) {
      throw new UnauthorizedException(
        'User information is missing or incomplete',
      );
    }

    return user.id;
  },
);
