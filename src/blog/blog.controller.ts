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
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { BlogService } from './blog.service';

import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogWithoutAuthorDto } from './dto/create-blog-without-author.dto';
import { FilterBlogDto } from './dto/filter-blog.dto';

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
  @ApiQuery({
    type: FilterBlogDto,
  })
  findAll(@Query() dto: FilterBlogDto) {
    return this.blogService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Get(':id/interactions')
  findInteractions(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findInteractions(id);
  }

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
