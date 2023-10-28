import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubscriptionRepository } from '../../subscription/subscription.repository';
import { RequestContext } from '../interfaces/request-context.interface';

@Injectable()
export class ClientTrainerInterceptor implements NestInterceptor {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    if (!request.user) return next.handle();
    const subscription = await this.subscriptionRepository.findOne({
      client: request.user._id,
    });
    request.trainerId = subscription?.trainer;
    return next.handle();
  }
}
