import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
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
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
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
