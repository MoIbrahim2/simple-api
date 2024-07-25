import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { User } from 'entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private User: Repository<User>) {}

  async getAllUsers() {
    const users = await this.User.find({ relations: ['profile'] });
    return users;
  }
  async createUser(userData) {
    const user = this.User.create(userData);
    const savedUser = await this.User.save(user);
    return savedUser;
  }
  async deleteUser(id) {
    await this.User.delete({ id });
    return;
  }
  getUserById(id) {
    return;
  }
  async editUserById(id, userData) {
    const existingUser = await this.User.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.User.update(id, { ...userData });
    const updatedUser = await this.User.findOne({ where: { id } });
    return updatedUser;
  }
}
