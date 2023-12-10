import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './subscription.schema';
import { SubscriptionListener } from './subscription.listener';
import { SubscriptionRepository } from './subscription.repository';
import { SubscribedClientValidator } from './validators/subscribed-client.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  providers: [
    SubscriptionService,
    SubscriptionListener,
    SubscriptionRepository,
    SubscribedClientValidator,
  ],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
