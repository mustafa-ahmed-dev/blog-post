import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from '@prisma/client';

import { RegisterDto } from './dto/register.dto';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';

import { JwtPayload } from './types/jwt-payload';

import { UserService } from '@/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request) {
    const user = request?.user as JwtPayload;

    return user;
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
