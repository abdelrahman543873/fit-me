import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { ObjectId } from 'mongoose';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  addSubscription(clientRegisteredEvent: ClientRegisteredEvent) {
    return this.subscriptionRepository.addSubscription(clientRegisteredEvent);
  }

  async getTrainer(client: ObjectId) {
    const subscription = await this.subscriptionRepository.getTrainer(client);
    return subscription.trainer;
  }
}
