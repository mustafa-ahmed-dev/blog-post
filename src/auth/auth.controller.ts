import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request, @Body() dto: LoginDto) {
    const user = request?.user;

    return user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() request: Request) {
    const user = request?.user;
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {}
}
