import {
  IsEmail,
  IsNotEmpty,
  isNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;
}
