import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsEmail,
  IsNotEmpty,
  Length,
  MaxDate,
  IsStrongPassword,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(new Date(Date.now()))
  @ApiProperty({
    type: Date,
    required: true,
    example: new Date(Date.now() - 9e11),
  })
  dateOfBirth!: Date;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @Transform(({ value }: { value: string }) => value.toLowerCase())
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
  @IsString()
  @Length(1, 35)
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @Matches(/^[a-z]/, {
    message: 'Username must begin with a letter',
  })
  @Matches(/^[a-z][a-z0-9\-]+$/, {
    message: 'Invalid Username',
  })
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 20,
    required: true,
    example: 'john-doe',
  })
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
