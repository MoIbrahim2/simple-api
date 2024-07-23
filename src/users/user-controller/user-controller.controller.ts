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
import { CreateUserDto } from '../dtos/createUser.dto';
import { UsersService } from '../services/users/users.service';
import { ValidateCreateUserPipe } from '../pipes/validate-create-user/validate-create-user.pipe';

@Controller('user')
export class UserControllerController {
  constructor(private userService: UsersService) {}
  @Get()
  getUser(@Query('sort') sort: string) {
    return this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.age.toPrecision());
    this.userService.creatUser(userData);
    return { status: 'success' };
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (!user)
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    return user;
  }
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.deleteUser(id);
    if (!user)
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    return;
  }
  @Patch(':id')
  editUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: CreateUserDto,
  ) {
    const user = this.userService.editUserById(id, userData);
    return user;
  }
}
