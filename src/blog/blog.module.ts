import { Module } from '@nestjs/common';

import { BlogController } from './blog.controller';

import { BlogService } from './blog.service';
import { InteractionService } from '@/interaction/interaction.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, InteractionService],
})
export class BlogModule {}
