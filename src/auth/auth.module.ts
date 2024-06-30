import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { HashService } from '@/common/services/hash.service';

@Module({
  imports: [],
  providers: [AuthService, HashService],
  controllers: [AuthController],
})
export class AuthModule {}
