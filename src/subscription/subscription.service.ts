import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { ObjectId } from 'mongoose';
import { FilterSubscriptionsDto } from './inputs/filter-subscriptions.dto';
import { CompletedFormEvent } from '../form/events/form-completed.event';
import { SUBSCRIPTION_STATUS } from './subscription.constants';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  addSubscription(clientRegisteredEvent: ClientRegisteredEvent) {
    return this.subscriptionRepository.addSubscription(clientRegisteredEvent);
  }

  completedFormHandler(completedFormEvent: CompletedFormEvent) {
    return this.subscriptionRepository.updateSubscriptionStatus({
      client: completedFormEvent.client,
      trainer: completedFormEvent.trainer,
      status: SUBSCRIPTION_STATUS.PENDING,
    });
  }

  approveSubscription(subscriptionId: MongoIdDto) {
    return this.subscriptionRepository.approveSubscription(subscriptionId);
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

  skipForm(trainer: ObjectId, client: ObjectId) {
    return this.subscriptionRepository.skipForm(trainer, client);
  }

  async getClientSubscription(client: ObjectId, trainer: ObjectId) {
    const subscriptionRecord =
      await this.subscriptionRepository.getClientSubscription(client, trainer);
    if (!subscriptionRecord) return null;
    const subscription = subscriptionRecord.toJSON();
    if (subscription.approvedAt) {
      const endDate = new Date(subscription.approvedAt.toISOString());
      endDate.setMonth(
        endDate.getMonth() + subscription.plan['monthsDuration'],
      );
      subscription.endDate = endDate;
    }
    return subscription;
  }

  choosePlan({
    trainer,
    client,
    plan,
  }: {
    trainer: ObjectId;
    client: ObjectId;
    plan: ObjectId;
  }) {
    return this.subscriptionRepository.choosePlan({ trainer, client, plan });
  }
}
