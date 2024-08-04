import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UserController } from './controller/users/user.controller';
import { UsersService } from './services/users/users.service';
import { ExampleMiddleware } from './middleware/example/example.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { ProfilesController } from './controller/profiles/profiles.controller';
import { ProfilesService } from './services/profiles/profiles.service';
import { Profile } from 'entities/Profile';
import { PostsService } from './services/posts/posts.service';
import { PostsController } from './controller/posts/posts.controller';
import { Post } from 'entities/Posts';

import { JwtService } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Post]),
    CacheModule.register(),
  ],
  controllers: [UserController, ProfilesController, PostsController],
  providers: [UsersService, ProfilesService, PostsService, JwtService],
  exports: [UsersModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes({
      path: 'user',
      method: RequestMethod.GET,
    });
  }
}
