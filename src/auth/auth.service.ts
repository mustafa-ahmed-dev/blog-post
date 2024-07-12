import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';

import { ExtendedPrismaClient } from '@/common/prisma/prisma.extension';

import { HashService } from '@/common/services/hash.service';

import { LoginDto } from './dto/login.dto';

import { JwtPayload } from './classes/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    @Inject('PrismaService')
    private readonly prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async validateUser(dto: LoginDto) {
    const { username, password } = dto;

    const { password: hashedPassword, ...userData } =
      await this.prismaService.client.user.findForLogin(username);

    if (!userData) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatch = this.hashService.compare(password, hashedPassword);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    const user = userData as JwtPayload;
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
  }

  generateAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload);
  }
}
