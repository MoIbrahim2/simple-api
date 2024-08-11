import { IsNotEmpty } from 'class-validator';

export class LoginData {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
