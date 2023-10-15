import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';
import { UserEvents } from 'src/user/user.constants';
import { ClientService } from './client.service';

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
