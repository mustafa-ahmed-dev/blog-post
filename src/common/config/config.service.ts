import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ConfigDto } from './dto/config.dto';
import { DatabaseConfigDto } from './dto/database-config.dto';
import { JwtConfigDto } from './dto/jwt-config.dto';
import { AppConfigDto } from './dto/app-config.dto';

import { Environment } from './enums/environment.enum';
import { Protocol } from './enums/protocol.enum';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get jwtConfig(): JwtConfigDto {
    const jwtConfig = this.getJwtConfig();

    return this.validate(JwtConfigDto, jwtConfig);
  }

  get databaseConfig(): DatabaseConfigDto {
    const databaseConfig = this.getDatabaseConfig();

    return this.validate(DatabaseConfigDto, databaseConfig);
  }

  get appConfig(): AppConfigDto {
    const appConfig = this.getAppConfig();

    return this.validate(AppConfigDto, appConfig);
  }

  get config(): ConfigDto {
    const config = this.getConfig();

    return this.validate(ConfigDto, config);
  }

  private validate<T extends Object>(classType: new () => T, config: T): T {
    const validatedConfig = plainToInstance(classType, config);
    const errors = validateSync(validatedConfig);

    if (errors.length > 0) {
      const errorsString = errors.toString();

      throw new Error(errorsString);
    }

    return validatedConfig;
  }

  private getConfig() {
    return {
      app: this.getAppConfig(),
      database: this.getDatabaseConfig(),
      jwt: this.getJwtConfig(),
    } as ConfigDto;
  }

  private getDatabaseConfig() {
    return {
      database: this.configService.get<string>('DATABASE_NAME'),
      host: this.configService.get<string>('DATABASE_HOST'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<number>('DATABASE_PORT'),
      schema: this.configService.get<string>('DATABASE_SCHEMA'),
      url: this.configService.get<string>('DATABASE_URL'),
      username: this.configService.get<string>('DATABASE_USER'),
    } as DatabaseConfigDto;
  }

  private getJwtConfig() {
    return {
      secret: this.configService.get<string>('JWT_SECRET'),
    } as JwtConfigDto;
  }

  private getAppConfig() {
    return {
      host: this.configService.get<string>('HOST'),
      port: this.configService.get<number>('PORT'),
      environment: this.configService.get<Environment>('NODE_ENV'),
      protocol: this.configService.get<Protocol>('PROTOCOL'),
    } as AppConfigDto;
  }
}
