import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UsersService } from '../services/users/users.service';

@Controller('user-controller')
export class UserControllerController {
  constructor(private userService: UsersService) {}
  @Get()
  getUser(@Query('sort') sort: string) {
    return this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    this.userService.creatUser(userData);
    return { status: 'success' };
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
