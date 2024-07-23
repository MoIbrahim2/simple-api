import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const parseAgeToInt = parseInt(value.age);
    if (isNaN(parseAgeToInt))
      throw new HttpException('Age is not a number', HttpStatus.BAD_REQUEST);

    return { ...value, age: parseAgeToInt };
  }
}
