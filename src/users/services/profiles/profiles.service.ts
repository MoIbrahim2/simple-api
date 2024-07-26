import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'entities/Profile';
import { User } from 'entities/User';
import { Request } from 'express';
import { CreateUserProfileDto } from 'src/users/dtos/createUserProfile.dot';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private Profile: Repository<Profile>,
    @InjectRepository(User) private User: Repository<User>,
  ) {}
  async createUserProfile(userProfileData: CreateUserProfileDto, id: number) {
    const user = await this.User.findOneBy({ id });
    if (!user) throw new HttpException('User not found ', HttpStatus.NOT_FOUND);
    const profile = this.Profile.create(userProfileData);
    const savedProfile = await this.Profile.save(profile);
    user.profile = savedProfile;
    await this.User.save(user);
    return savedProfile;
  }
}
