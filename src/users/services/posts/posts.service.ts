import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'entities/Posts';
import { User } from 'entities/User';
import { createUserPostDto } from 'src/users/dtos/createUserPost.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User) private User: Repository<User>,
    @InjectRepository(Post) private Post: Repository<Post>,
  ) {}
  async createUserPost(id: number, createUserPostData: createUserPostDto) {
    const user = await this.User.findOneBy({ id });
    if (!user) throw new HttpException('User not found ', HttpStatus.NOT_FOUND);

    const post = this.Post.create({
      ...createUserPostData,
      ...user,
    });
    const savedPost = await this.Post.save(post);
    return savedPost;
  }
}
