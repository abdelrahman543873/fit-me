import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Client, ClientDocument } from './client.schema';
import { ClientRegisteredEvent } from '../user/events/client-registered.event';

@Injectable()
export class ClientRepository extends BaseRepository<Client> {
  constructor(
    @InjectModel(Client.name)
    private clientSchema: Model<ClientDocument>,
  ) {
    super(clientSchema);
  }

  registerClient(clientRegisterEvent: ClientRegisteredEvent) {
    return this.clientSchema.create({ _id: clientRegisterEvent.clientId });
  }
}
