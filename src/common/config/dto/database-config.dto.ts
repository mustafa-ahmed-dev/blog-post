import { IsString, IsNumber, IsInt, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class DatabaseConfigDto {
  @IsString()
  database: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @Matches(/^postgresql:\/\/[^:]+:[^@]+@[^:]+:\d+\/[^\/]+$/, {
    message: 'Invalid PostgreSQL database URL',
  })
  url: string;

  @IsString()
  host: string;

  @IsString()
  schema: string;

  @Transform(({ value }) => parseInt(value, 10), {
    toClassOnly: true,
  })
  @IsNumber()
  @IsInt()
  port: number;
}
