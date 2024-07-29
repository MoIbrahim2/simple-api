import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Type,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

export const RestrictTO = (...roles: string[]) => {
  @Injectable()
  class RolesGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest() as Request;
      const user = req['user'];
      if (!roles.includes(user.role)) {
        throw new HttpException(
          "You don't have the permission to perform this action",
          HttpStatus.UNAUTHORIZED,
        );
      }
      return true;
    }
  }
  return RolesGuard;
};
