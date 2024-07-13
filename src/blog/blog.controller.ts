import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BlogService } from './blog.service';

import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogWithoutAuthorDto } from './dto/create-blog-without-author.dto';

import { BlogOwnershipGuard } from './guards/blog-ownership.guard';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';

import { UserId } from '@/common/decorators/user-id.decorator';

@Controller('blogs')
@ApiTags('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBlogWithoutAuthorDto, @UserId() authorId: number) {
    return this.blogService.create(dto, authorId);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Get(':id/interactions')
  getNumberInteractions(@Param('id', ParseIntPipe) id: number) {}

  @UseGuards(JwtAuthGuard, BlogOwnershipGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, BlogOwnershipGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.remove(id);
  }
}
