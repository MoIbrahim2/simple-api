import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { LoginData } from 'src/users/dtos/loginUser.dto';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { ReturnDocument } from 'typeorm';

@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async singup(@Body(ValidateCreateUserPipe) createUserData: CreateUserDto) {
    return this.authService.singup(createUserData);
  }

  @Post('login')
  async login(@Body() loginData: LoginData) {
    return this.authService.login(loginData.username, loginData.password);
  }
}
