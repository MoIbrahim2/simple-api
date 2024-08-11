import { InjectQueue } from '@nestjs/bullmq';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { User } from 'entities/User';
import { Repository } from 'typeorm';
import { ApiFeatures } from 'utils/ApiFeatures';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private User: Repository<User>,
    @InjectQueue('addUser') private addUser: Queue,
  ) {}

  async getAllUsers(queryParam) {
    const queryBuilder = this.User.createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.posts', 'posts');

    const features = new ApiFeatures(queryBuilder, queryParam)
      .sort()
      .limitFields()
      .filter()
      .returnQuery();

    const users = await features.getMany();

    // eample of add job to queue
    // users.forEach(async (user) => {
    //   await this.addUser.add('addUser', { user });
    // });

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
