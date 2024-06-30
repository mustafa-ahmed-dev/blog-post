import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';

import { UserWithBlogsEntity } from '@/user/entities/user-with-blog.entity';

import { FindSingleUserWithProfile } from '../../types/user.type';

@Injectable()
export class UserProfileSerializer implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<FindSingleUserWithProfile>,
  ) {
    return next.handle().pipe(map((data) => this.transformUser(data)));
  }

  private transformUser(user: FindSingleUserWithProfile) {
    if (user.details) {
      user = {
        ...user,
        ...user.details,
      };

      delete user.details;
    }

    return plainToClass(UserWithBlogsEntity, user, {
      excludeExtraneousValues: true,
    });
  }
}
