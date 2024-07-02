import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
    examples: ['mail@john-doe.com', 'john.doe'],
  })
  username: string;

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
  password: string;
}
