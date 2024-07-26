import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { createUserPostDto } from 'src/users/dtos/createUserPost.dto';
import { PostsService } from 'src/users/services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createUserPost(
    @Req() req: Request,
    @Body() createUserPostData: createUserPostDto,
  ) {
    return this.postsService.createUserPost(
      req['user'].userId,
      createUserPostData,
    );
  }
}
