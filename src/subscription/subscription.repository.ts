import { Global, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { FilterSubscriptionsDto } from './inputs/filter-subscriptions.dto';
import { SUBSCRIPTION_STATUS } from './subscription.constants';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';

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

  approveSubscription(subscriptionId: MongoIdDto) {
    return this.subscriptionSchema.findOneAndUpdate(
      {
        _id: subscriptionId.id,
      },
      {
        status: SUBSCRIPTION_STATUS.APPROVED,
        approvedAt: new Date(),
      },
      { new: true },
    );
  }

  updateSubscriptionStatus({
    client,
    trainer,
    status,
  }: {
    client: ObjectId;
    trainer: ObjectId;
    status: SUBSCRIPTION_STATUS;
  }) {
    return this.subscriptionSchema.updateOne({ client, trainer }, { status });
  }

  getTrainer(client: ObjectId) {
    return this.subscriptionSchema
      .findOne({
        client: client,
      })
      .populate('trainer')
      .lean();
  }

  getClientSubscription(client: ObjectId, trainer: ObjectId) {
    return this.subscriptionSchema
      .findOne({ trainer, client })
      .populate(['client', 'plan']);
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
    return this.subscriptionSchema.findOneAndUpdate(
      { trainer, client },
      { plan, status: SUBSCRIPTION_STATUS.PLAN_CHOSEN },
      { new: true },
    );
  }

  skipForm(trainer: ObjectId, client: ObjectId) {
    return this.subscriptionSchema.findOneAndUpdate(
      { client, trainer },
      { status: SUBSCRIPTION_STATUS.PENDING },
      { new: true },
    );
  }

  filterSubscriptions(
    trainer: ObjectId,
    filterSubscriptionsDto: FilterSubscriptionsDto,
  ) {
    return this.subscriptionSchema.aggregate<Subscription>([
      {
        $match: {
          trainer,
          ...(filterSubscriptionsDto.status && {
            status: filterSubscriptionsDto.status,
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
