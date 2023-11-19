import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestContext } from '../interfaces/request-context.interface';
import { Reflector } from '@nestjs/core';
import { IS_CLIENT_KEY } from '../decorators/client.decorator';
import { USER_ROLE } from '../../user/user.constants';
import { BaseHttpException } from '../exceptions/base-http-exception';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    const isClient = this.reflector.getAllAndOverride<boolean>(IS_CLIENT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isClient && request.user.role === USER_ROLE.TRAINER)
      throw new BaseHttpException(604);
    return true;
  }
}
