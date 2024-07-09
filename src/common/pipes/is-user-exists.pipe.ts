import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { UserService } from '@/user/user.service';

@Injectable()
export class IsUserExistsPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
