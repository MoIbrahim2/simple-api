import { IsNotEmpty } from 'class-validator';

export class createUserPostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  dictionary: string;
}
