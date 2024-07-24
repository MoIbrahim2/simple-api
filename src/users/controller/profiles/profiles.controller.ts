import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserController } from '../users/user.controller';
import { ProfilesService } from 'src/users/services/profiles/profiles.service';
import { CreateUserProfileDto } from 'src/users/dtos/createUserProfile.dot';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @Post(':id')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfileData: CreateUserProfileDto,
  ) {
    return this.profileService.createUserProfile(id, userProfileData);
  }
}
