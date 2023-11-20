import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestContext } from '../../../dist/shared/interfaces/request-context.interface';

@Injectable()
export class BulkMeasurementsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.body.measurements = request.body.measurements.map((measurement) => {
      return { ...measurement, client: request.user._id };
    });
    console.log(request.body.measurements);
    return next.handle();
  }
}
