import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { ClientService } from './client.service';
import { UserEvents } from '../user/user.constants';

@Injectable()
export class ClientListener {
  constructor(private readonly clientService: ClientService) {}

  @OnEvent(UserEvents.CLIENT_REGISTRATION)
  async handleClientRegisteredEvent(
    clientRegisteredEvent: ClientRegisteredEvent,
  ) {
    await this.clientService.registerClient(clientRegisteredEvent);
  }
}
