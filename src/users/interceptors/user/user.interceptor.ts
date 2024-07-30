import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      'Here is some values',
      context.getClass(),
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => {
        data.data.password = undefined;
        return data;
      }),
    );
  }
}
