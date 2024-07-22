import { Module } from '@nestjs/common';

import { UserControllerController } from './user-controller/user-controller.controller';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UserControllerController],
  providers: [UsersService],
})
export class UsersModule {}
