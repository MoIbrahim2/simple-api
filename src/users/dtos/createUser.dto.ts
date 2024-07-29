import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, {
    message: 'Password must be not more than 8 characters long ',
  })
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;

  role: string;
}
