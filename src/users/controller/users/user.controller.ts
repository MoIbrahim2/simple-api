import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UsersService } from '../../services/users/users.service';
import { ValidateCreateUserPipe } from '../../pipes/validate-create-user/validate-create-user.pipe';
import { UpdateUserDto } from '../../dtos/updateUser.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { RestrictTO } from 'src/auth/guards/roles/roles.guard';
import { UserInterceptor } from 'src/users/interceptors/user/user.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}
  @UseGuards(AuthGuard, RestrictTO('admin'))
  @Get()
  async getUser(@Req() req: Request) {
    const users = await this.userService.getAllUsers(req.query);
    return { users };
  }

  @UsePipes(new ValidationPipe({}))
  @Post()
  async createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    const user = await this.userService.createUser(userData);
    return { status: 'success', data: user };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async editUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    const user = await this.userService.editUserById(id, userData);
    return user;
  }
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return;
  }
}
