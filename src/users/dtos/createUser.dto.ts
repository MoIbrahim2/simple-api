import {
  IsEmail,
  IsNotEmpty,
  isNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: String;

  @IsNotEmpty()
  @IsEmail()
  email: String;
}
