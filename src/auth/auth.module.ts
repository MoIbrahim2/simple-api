import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';

dotenv.config({
  path: '/Users/mohamedibrahim/Nest js/simple-api/src/config.env',
});

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, UsersService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard, AuthModule],
})
export class AuthModule {}
