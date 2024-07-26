import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { Profile } from 'entities/Profile';
import { Post } from 'entities/Posts';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';

dotenv.config({
  path: '/Users/mohamedibrahim/Nest js/simple-api/src/config.env',
});

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Profile, Post],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
