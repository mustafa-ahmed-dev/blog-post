import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IsUsername } from '../decorators/is-username.decorator';
import { IsDateOfBirth } from '../decorators/is-date-of-birth.decorator';
import { IsEmail } from '../decorators/is-email.decorator';

import { PaginationDto } from '@/common/dto/pagination.dto';

export class UserFiltersDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter users by name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter users by username',
  })
  @IsOptional()
  @IsUsername()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Filter users by date of birth',
  })
  @IsOptional()
  @IsDateOfBirth()
  dateOfBirth?: Date;
}
