import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { HashService } from '@/common/services/hash.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { jwtConstants } from './constants';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, HashService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
