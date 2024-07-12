import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from '@prisma/client';
import { plainToInstance, instanceToPlain } from 'class-transformer';

import { RegisterDto } from './dto/register.dto';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';

import { JwtPayload } from './classes/jwt-payload';

import { UserService } from '@/user/user.service';
import { AuthService } from './auth.service';

import { getPayload } from './helpers/get-payload.helper';

class X {}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Req() request: Request) {
    const user = request?.user as JwtPayload;

    return user;
  }

  @Get('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Req() request: Request) {
    const data = request?.user as JwtPayload & {
      iat: number;
      exp: number;
    };

    const payload = getPayload(data);

    const refreshToken = await this.authService.generateRefreshToken(payload);

    return {
      refreshToken,
    };
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() request: Request) {
    const user = request?.user as JwtPayload;

    return user;
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.userService.create({
      ...dto,
      role: Role.User,
    });
  }
}
