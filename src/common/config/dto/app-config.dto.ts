import { IsString, IsNumber, IsInt, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { Protocol } from './../enums/protocol.enum';
import { Environment } from '../enums/environment.enum';

export class AppConfigDto {
  @IsEnum(Environment)
  environment: Environment;

  @Transform(({ value }) => parseInt(value, 10), {
    toClassOnly: true,
  })
  @IsNumber()
  @IsInt()
  port: number;

  @IsString()
  host: string;

  @IsEnum(Protocol)
  protocol: Protocol;
}
