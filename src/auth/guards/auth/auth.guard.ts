import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { Repository } from 'typeorm';

dotenv.config({
  path: '/Users/mohamedibrahim/Nest js/simple-api/src/config.env',
});

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private User: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest() as Request;

    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
      throw new HttpException(
        'You are not logged in, please login ',
        HttpStatus.UNAUTHORIZED,
      );
    let decoded;
    try {
      decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException('unauthorized JWT token');
    }
    const user = await this.User.findOneBy({ id: decoded.userId });
    if (!user)
      throw new HttpException(
        'The user belonging to this token is no longer exists. Please login again',
        HttpStatus.UNAUTHORIZED,
      );

    req['user'] = user;
    return true;
  }
}
