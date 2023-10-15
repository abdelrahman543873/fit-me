import { SubscriptionRepository } from '../../src/subscription/subscription.repository';

export const SubscriptionRepo = (): SubscriptionRepository =>
  global.subscriptionRepository;
