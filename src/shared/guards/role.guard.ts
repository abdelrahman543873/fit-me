import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestContext } from '../interfaces/request-context.interface';
import { Reflector } from '@nestjs/core';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { USER_ROLE } from '../../user/user.constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    const role = this.reflector.getAllAndOverride<USER_ROLE>('ROLE', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (request.user.role !== role) throw new BaseHttpException(604);
    return true;
  }
}
