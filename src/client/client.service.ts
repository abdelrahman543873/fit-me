import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  registerClient(clientRegisterEvent: ClientRegisteredEvent) {
    return this.clientRepository.registerClient(clientRegisterEvent);
  }
}
