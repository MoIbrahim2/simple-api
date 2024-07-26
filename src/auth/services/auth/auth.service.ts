import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { createUserPostDto } from 'src/users/dtos/createUserPost.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private User: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async singup(createUserData: CreateUserDto) {
    const user = this.User.create(createUserData);
    const newUser = await this.User.save(user);

    if (!newUser)
      throw new HttpException("Can't create user", HttpStatus.BAD_REQUEST);
    const token = await this.jwtService.signAsync({ userId: newUser.id });
    return { token, data: user };
  }

  async login(username: string, password: string) {
    const user = await this.User.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new HttpException(
        'Invalid username or Wrong password',
        HttpStatus.NOT_FOUND,
      );
    const token = await this.jwtService.signAsync({ userId: user.id });
    return { token };
  }
}
