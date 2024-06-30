import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';

import { UserEntity } from '../../entities/user.entity';

import { FindManyUsers, FindSingleUser } from '../../types/user.type';

@Injectable()
export class UserSerializer implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<FindSingleUser | FindManyUsers>,
  ) {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          const [usersData, pagination] = data;

          const users = usersData.map((userData) => {
            return this.transformUser(userData);
          });

          return [users, pagination];
        }

        return this.transformUser(data);
      }),
    );
  }

  private transformUser(user: FindSingleUser) {
    if (user.details) {
      user = {
        ...user,
        ...user.details,
      };

      delete user.details;
    }

    return plainToClass(UserEntity, user, {
      excludeExtraneousValues: true,
    });
  }
}
