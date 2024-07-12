import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

import { IsID } from '@/common/decorators/is-id.decorator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 255,
    required: true,
  })
  description!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
  })
  text!: string;

  @IsNotEmpty()
  @IsID()
  @ApiProperty({
    type: Number,
    minimum: 1,
    required: true,
  })
  authorId!: number;
}
