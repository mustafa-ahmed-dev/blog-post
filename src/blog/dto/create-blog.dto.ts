import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

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
  @Transform(({ value }: { value: string }) => parseInt(value, 10), {
    toClassOnly: true,
  })
  @IsNumber()
  @IsInt()
  @Min(1)
  @ApiProperty({
    type: Number,
    minimum: 1,
    required: true,
  })
  authorId!: number;
}
