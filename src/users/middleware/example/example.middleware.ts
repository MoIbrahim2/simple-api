import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('Exapmle');
    // console.log(req.headers.authorization);
    // const { authorization } = req.headers;
    // if (!authorization) {
    //   throw new HttpException('No auth token', HttpStatus.FORBIDDEN);
    // }
    // if (authorization === '123123') next();
    // else throw new HttpException('Wrong token', HttpStatus.FORBIDDEN);
    next();
  }
}
