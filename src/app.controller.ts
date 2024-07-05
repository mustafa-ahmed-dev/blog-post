import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';

import { AppService } from './app.service';

import { JwtAuthGuard } from './common/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('roles')
  getRoles() {
    const roles = Object.values(Role);

    return roles;
  }
}
