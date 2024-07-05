import { Module } from '@nestjs/common';
import {
  CustomPrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ExtendedPrismaConfigService } from '@/common/prisma/ExtendedPrismaConfig.service';

import { HashService } from '@/common/services/hash.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { AppConfigModule } from './common/config/config.module';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useClass: ExtendedPrismaConfigService,
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [providePrismaClientExceptionFilter(), AppService, HashService],
})
export class AppModule {}
