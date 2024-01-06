import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestContext } from '../interfaces/request-context.interface';

@Injectable()
export class MediaInBodyInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    if (request.file)
      request.body[request.file.fieldname] =
        request?.file?.filename || request.file['location'];
    return next.handle();
  }
}
