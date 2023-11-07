import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { ObjectId } from 'mongoose';
import { FilterSubscriptionsDto } from './inputs/filter-subscriptions.dto';
import { UpdateSubscriptionDto } from './inputs/update-subscription.dto';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';

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

  filterSubscriptions(
    trainerId: ObjectId,
    filterSubscriptionsDto: FilterSubscriptionsDto,
  ) {
    return this.subscriptionRepository.filterSubscriptions(
      trainerId,
      filterSubscriptionsDto,
    );
  }

  updateSubscription(
    trainerId: ObjectId,
    subscriptionId: MongoIdDto,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionRepository.updateSubscription(
      trainerId,
      subscriptionId,
      updateSubscriptionDto,
    );
  }
}
