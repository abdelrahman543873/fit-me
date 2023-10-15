import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepository } from './subscription.repository';

@Module({
  providers: [SubscriptionService, SubscriptionRepository],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
