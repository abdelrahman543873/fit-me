import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_USER_IN_ARRAY } from '../decorators/is-user-in-array.decorator';

@Injectable()
export class RequestInBodyInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isUserInArray = this.reflector.getAllAndOverride<string>(
      IS_USER_IN_ARRAY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    if (isUserInArray) {
      request.body[isUserInArray] = request.body[isUserInArray].map((item) => {
        return { ...item, user: JSON.stringify(request.user) };
      });
      return next.handle();
    }
    request.body.user = JSON.stringify(request.user);
    request.params.user = JSON.stringify(request.user);
    return next.handle();
  }
}
