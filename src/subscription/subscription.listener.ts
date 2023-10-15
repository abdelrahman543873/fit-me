import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { UserEvents } from 'src/user/user.constants';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class SubscriptionListener {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @OnEvent(UserEvents.CLIENT_REGISTRATION)
  async handleClientRegisteredEvent(
    clientRegisteredEvent: ClientRegisteredEvent,
  ) {
    await this.subscriptionService.addSubscription(clientRegisteredEvent);
  }
}
