import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';

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
      client: clientRegisteredEvent.clientId,
      trainer: clientRegisteredEvent.trainerId,
    });
  }

  getTrainer(clientId: ObjectId) {
    return this.subscriptionSchema
      .findOne({
        client: clientId,
      })
      .populate('trainer')
      .lean();
  }
}
