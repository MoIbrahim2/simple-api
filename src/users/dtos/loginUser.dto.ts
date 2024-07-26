import { IsNotEmpty } from 'class-validator';
import { In } from 'typeorm';

export class LoginData {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
