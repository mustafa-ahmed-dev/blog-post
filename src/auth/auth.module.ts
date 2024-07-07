import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfigModule } from '@/common/config/config.module';
import { AppConfigService } from '@/common/config/config.service';

import { HashService } from '@/common/services/hash.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UserService } from '@/user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtConfig.secret,
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    AppConfigModule,
  ],
  providers: [
    AuthService,
    HashService,
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
