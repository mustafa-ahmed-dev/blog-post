import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsStrongPassword,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsUsername } from '../decorators/is-username.decorator';
import { IsEmail } from '../decorators/is-email.decorator';
import { IsDateOfBirth } from '../decorators/is-date-of-birth.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 20,
    required: true,
    example: 'john',
  })
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 20,
    required: true,
    example: 'doe',
  })
  middleName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 20,
    required: true,
    example: 'james',
  })
  lastName!: string;

  @IsNotEmpty()
  @IsDateOfBirth()
  @ApiProperty({
    type: Date,
    required: true,
    example: new Date(Date.now() - 9e11),
  })
  dateOfBirth!: Date;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
    example: 'mail@john-doe.com',
  })
  email!: string;

  @IsNotEmpty()
  @IsUsername()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minLength: 12,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    type: String,
    minLength: 12,
    required: true,
    example: '@John##Doe/20@',
  })
  password!: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
    enumName: 'role',
    example: Role.User,
  })
  role: Role = Role.User;
}
