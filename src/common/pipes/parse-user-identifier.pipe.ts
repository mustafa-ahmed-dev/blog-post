import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseUserIdentifierPipe
  implements PipeTransform<string, string | number>
{
  transform(value: string): string | number {
    const id = parseInt(value, 10);
    if (!isNaN(id)) {
      return id;
    } else if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    } else {
      throw new BadRequestException('Invalid user identifier');
    }
  }
}
