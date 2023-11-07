import { Global, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { FilterSubscriptionsDto } from './inputs/filter-subscriptions.dto';

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

  filterSubscriptions(
    trainer: ObjectId,
    filterSubscriptionsDto: FilterSubscriptionsDto,
  ) {
    return this.subscriptionSchema.aggregate<Subscription>([
      {
        $match: {
          trainer,
          ...(filterSubscriptionsDto.accepted && {
            accepted: filterSubscriptionsDto.accepted,
          }),
        },
      },
      {
        $lookup: {
          from: 'plans',
          localField: 'plan',
          foreignField: '_id',
          as: 'plan',
        },
      },
      { $unwind: '$plan' },
      {
        $lookup: {
          from: 'users',
          localField: 'client',
          foreignField: '_id',
          as: 'client',
        },
      },
      { $unwind: '$client' },
    ]);
  }
}
