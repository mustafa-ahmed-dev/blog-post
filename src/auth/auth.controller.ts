import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {}
