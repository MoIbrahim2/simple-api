import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserController } from '../users/user.controller';
import { ProfilesService } from 'src/users/services/profiles/profiles.service';
import { CreateUserProfileDto } from 'src/users/dtos/createUserProfile.dot';

import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createUserProfile(
    @Body() userProfileData: CreateUserProfileDto,
    @Req() req: Request,
  ) {
    return this.profileService.createUserProfile(
      userProfileData,
      req['user'].id,
    );
  }
}
