import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { MoreThanOrEqual, Repository } from 'typeorm';

import { createCheckStayingLoginCronJob } from 'utils/checkLogin';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Request, Response } from 'express';
import { generateResetToken } from 'utils/passwordResetToken';
import { sendEmail } from 'utils/email';
import { ForgotPasswordDto } from 'src/users/dtos/forgotPassword.dto';
import { ResetPasswordDto } from 'src/users/dtos/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private User: Repository<User>,
    private jwtService: JwtService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async singup(createUserData: CreateUserDto, res: Response) {
    const user = this.User.create(createUserData);
    const newUser = await this.User.save(user);

    if (!newUser)
      throw new HttpException("Can't create user", HttpStatus.BAD_REQUEST);
    const token = await this.jwtService.signAsync({ userId: newUser.id });
    const { password, ...userWithoutPassword } = newUser;

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return { token, data: userWithoutPassword };
  }

  async login(username: string, password: string) {
    const user = await this.User.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new HttpException(
        'Invalid username or Wrong password',
        HttpStatus.NOT_FOUND,
      );
    const token = await this.jwtService.signAsync({ userId: user.id });

    createCheckStayingLoginCronJob(
      token,
      this.jwtService,
      this.schedulerRegistry,
    );

    return { token };
  }
  async forgotPassword(data: ForgotPasswordDto, protocol, host) {
    const user = await this.User.findOne({
      where: { username: data.username },
      select: ['id', 'password', 'role', 'username'],
    });
    if (!user)
      throw new HttpException(
        'The user corresponding to that username not found',
        HttpStatus.BAD_REQUEST,
      );
    const { resetToken, hash } = generateResetToken();
    user.passwordResetToken = hash;
    user.resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await this.User.save(user);

    const resetURL = `${protocol}://${host}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Please submt a PATCH request along with your new password and password confirm to :${resetURL}.\n if you don't ignore this email`;
    try {
      await sendEmail({
        email: data.email,
        subject: 'your password reset token (valid for 10 minutes only)',
        message,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.resetTokenExpiresAt = undefined;
      await this.User.save(user);
      throw new HttpException(
        'There was an error while sending the email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { message: 'token sent to email' };
  }
  async resetPassword(resetToken: string, data: ResetPasswordDto) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await this.User.findOne({
      where: {
        passwordResetToken: hashedToken,
        resetTokenExpiresAt: MoreThanOrEqual(new Date(Date.now())),
      },
    });
    if (!user)
      throw new HttpException(
        "Either the token is incorrect or it's expired or maybe used before",
        HttpStatus.BAD_REQUEST,
      );
    user.password = data.password;
    user.passwordResetToken = null;
    user.resetTokenExpiresAt = null;
    await this.User.save(user);

    const token = await this.jwtService.signAsync({ userId: user.id });

    return { token, message: 'the password reset successfully' };
  }
  // async test(data) {
  //   const user = await this.User.findOne({
  //     where: { username: data.username },
  //     select: ['id', 'password', 'role', 'username'],
  //   });
  //   console.log(user.role);
  //   // user.password = 'zezo1234';
  //   user.role = 'user';

  //   await this.User.save(user);
  // }
}
