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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UsersService } from '../../services/users/users.service';
import { ValidateCreateUserPipe } from '../../pipes/validate-create-user/validate-create-user.pipe';
import { UpdateUserDto } from '../../dtos/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUser() {
    const users = await this.userService.getAllUsers();
    return { users };
  }

  @Post()
  @UsePipes(new ValidationPipe({}))
  async createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    const user = await this.userService.createUser(userData);
    return { status: 'success', data: user };
  }
  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number) {
  //   const user = this.userService.getUserById(id);
  //   if (!user)
  //     throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
  //   return user;
  // }
  // @Delete(':id')
  // deleteUserById(@Param('id', ParseIntPipe) id: number) {
  //   const user = this.userService.deleteUser(id);
  //   if (!user)
  //     throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
  //   return;
  // }
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
