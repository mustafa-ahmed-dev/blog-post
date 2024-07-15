import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InteractionErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2002':
              return throwError(
                () =>
                  new ConflictException(
                    'You already did an interaction to the blog, a user can only do one interaction on each blog',
                  ),
              );
          }
        }

        return throwError(() => error);
      }),
    );
  }
}
