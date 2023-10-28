import { Global, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';

@Global()
@Injectable()
export class SubscriptionRepository extends BaseRepository<Subscription> {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionSchema: Model<SubscriptionDocument>,
  ) {
    super(subscriptionSchema);
  }

  addSubscription(clientRegisteredEvent: ClientRegisteredEvent) {
    return this.subscriptionSchema.create({
      client: clientRegisteredEvent.client,
      trainer: clientRegisteredEvent.trainer,
    });
  }

  getTrainer(client: ObjectId) {
    return this.subscriptionSchema
      .findOne({
        client: client,
      })
      .populate('trainer')
      .lean();
  }
}
