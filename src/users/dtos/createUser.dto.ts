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
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  age: number;
}
