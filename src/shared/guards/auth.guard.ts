import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { RequestContext } from '../interfaces/request-context.interface';
import { LANGUAGE } from '../constants/lang.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../constants/env-variable-names';
import { Types } from 'mongoose';
import { UserRepository } from '../../user/user.repository';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.lang = request.headers['accept-language'] ?? LANGUAGE.EN;
    if (!request.headers.authorization) throw new BaseHttpException(602);
    const payload = await this.jwtService
      .verifyAsync<{ _id: string }>(
        request.headers.authorization.split(' ')[1],
        {
          secret: this.configService.get<string>(ENV_VARIABLE_NAMES.JWT_SECRET),
        },
      )
      .catch(() => {
        throw new BaseHttpException(603);
      });
    const user = await this.userRepository.findOne({
      _id: new Types.ObjectId(payload._id),
    });
    if (!user) throw new BaseHttpException(600);
    request.user = user;
    return true;
  }
}
