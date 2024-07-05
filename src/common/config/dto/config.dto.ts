import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { DatabaseConfigDto } from './database-config.dto';
import { JwtConfigDto } from './jwt-config.dto';

import { AppConfigDto } from './app-config.dto';

export class ConfigDto {
  @ValidateNested()
  @Type(() => AppConfigDto)
  app: AppConfigDto;

  @ValidateNested()
  @Type(() => DatabaseConfigDto)
  database: DatabaseConfigDto;

  @ValidateNested()
  @Type(() => JwtConfigDto)
  jwt: JwtConfigDto;
}
