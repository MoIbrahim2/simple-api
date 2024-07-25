import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { createUserPostDto } from 'src/users/dtos/createUserPost.dto';
import { PostsService } from 'src/users/services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post(':id')
  async createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostData: createUserPostDto,
  ) {
    return this.postsService.createUserPost(id, createUserPostData);
  }
}
