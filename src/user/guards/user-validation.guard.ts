import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Request } from 'express';

import { JwtPayload } from '@/auth/classes/jwt-payload';

@Injectable()
export class UserValidationGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;
    const dto = request.body as CreateUserDto;

    const allowedRoles = this.getAllowedRolesForUser(user.role);

    if (!allowedRoles.includes(dto.role)) {
      throw new ForbiddenException(
        'You do not have permission to create a user with this role',
      );
    }

    return true;
  }

  getAllowedRolesForUser(role: Role): Role[] {
    switch (role) {
      case Role.SuperAdmin:
        return [Role.SuperAdmin, Role.Admin, Role.Moderator, Role.User];
      case Role.Admin:
        return [Role.Admin, Role.Moderator, Role.User];
      case Role.Moderator:
        return [Role.Moderator, Role.User];
      default:
        return [];
    }
  }
}
