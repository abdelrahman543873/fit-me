import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  addSubscription(clientRegisteredEvent: ClientRegisteredEvent) {
    return this.subscriptionRepository.addSubscription(clientRegisteredEvent);
  }
}
