import { RequestContext } from './../../shared/interfaces/request-context.interface';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BulkMeasurementsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.body.measurements = request.body.measurements.map((measurement) => {
      return { ...measurement, client: request.user._id };
    });
    return next.handle();
  }
}