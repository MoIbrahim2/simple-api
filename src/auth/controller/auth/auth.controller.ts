import {
  Body,
  Controller,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserExceptionFilter } from 'src/exception-filter/exception-filter.filter';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { ForgotPasswordDto } from 'src/users/dtos/forgotPassword.dto';
import { LoginData } from 'src/users/dtos/loginUser.dto';
import { ResetPasswordDto } from 'src/users/dtos/resetPassword.dto';
import { UserInterceptor } from 'src/users/interceptors/user/user.interceptor';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';

// @UseFilters(UserExceptionFilter)
@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private eventEmitter: EventEmitter2,
  ) {}

  @UseInterceptors(UserInterceptor)
  @Post('/signup')
  async singup(
    @Body(ValidateCreateUserPipe) createUserData: CreateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.singup(createUserData, res);
    // this.eventEmitter.emit('user.created', user.data.username);
    return res.json({ ...user });
  }

  @Post('login')
  async login(@Body() loginData: LoginData) {
    return this.authService.login(loginData.username, loginData.password);
  }
  @Post('forgotPassword')
  async forgotPassword(
    @Body() forgotPasswordData: ForgotPasswordDto,
    @Req() req: Request,
  ) {
    return this.authService.forgotPassword(
      forgotPasswordData,
      req.protocol,
      req.get('host'),
    );
  }

  @Patch('resetPassword/:resetToken')
  async resetPassword(
    @Param('resetToken') resetToken: string,
    @Body(ValidateCreateUserPipe) resetPasswordData: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(resetToken, resetPasswordData);
  }
  // @Patch('test')
  // async test(@Body() username: string) {
  //   return this.authService.test(username);
  // }
}
