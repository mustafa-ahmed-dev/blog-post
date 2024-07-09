import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { UserSerializer } from './interceptors/serializers/user.serializer.interceptor';
import { UserProfileSerializer } from './interceptors/serializers/user-profile.serializer.interceptor';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserFiltersDto } from './dto/filter-user.dto';

import { getUserProfileSelect } from './helpers/get-user-profile-select.helper';
import { getUserSelect } from './helpers/get-user-select.helper';

import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { OwnershipGuard } from '@/common/guards/ownership.guard';
import { UserValidationGuard } from './guards/user-validation.guard';

import { Roles } from '@/common/decorators/roles.decorator';

import { RoleOrOwnershipGuardFactory } from '@/common/factories/role-or-ownership-guard.factory';

import {
  admins,
  managerialRoles,
} from '@/common/constants/user-roles.constant';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, UserValidationGuard)
  @Roles(managerialRoles)
  @UseInterceptors(UserSerializer)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(managerialRoles)
  @UseInterceptors(UserSerializer)
  @ApiQuery({
    type: UserFiltersDto,
  })
  @Get()
  findAll(@Query() dto: UserFiltersDto) {
    return this.userService.findAll(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserSerializer)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id, getUserSelect());
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserProfileSerializer)
  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id, getUserProfileSelect());
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @UseInterceptors(UserSerializer)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @UseInterceptors(UserSerializer)
  @Patch(':id/email')
  updateEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserEmailDto,
  ) {
    return this.userService.updateEmail(id, dto.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, UserValidationGuard)
  @Roles(managerialRoles)
  @UseInterceptors(UserSerializer)
  @Patch(':id/role')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.userService.updateRole(id, dto.role);
  }

  @UseGuards(JwtAuthGuard, RoleOrOwnershipGuardFactory(admins))
  @UseInterceptors(UserSerializer)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
