import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

import { IsUsername } from '../decorators/is-username.decorator';
import { IsDateOfBirth } from '../decorators/is-date-of-birth.decorator';
import { IsEmail } from '../decorators/is-email.decorator';

export class UserFiltersDto {
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
  email: string;

  @ApiPropertyOptional({
    description: 'Filter users by date of birth',
  })
  @IsOptional()
  @IsDateOfBirth()
  dateOfBirth?: Date;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of users per page for pagination',
    default: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
