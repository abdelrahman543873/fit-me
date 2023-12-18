import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientDiet, ClientDietDocument } from './client-diet.schema';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddClientDietDto } from './inputs/add-client-diet.input';
import { AddedFollowUpEvent } from '../follow-up/events/added-follow-up';

@Injectable()
export class ClientDietRepository extends BaseRepository<ClientDiet> {
  constructor(
    @InjectModel(ClientDiet.name)
    private clientDietSchema: Model<ClientDietDocument>,
  ) {
    super(clientDietSchema);
  }

  addClientDiet(addClientDietDto: AddClientDietDto) {
    return this.clientDietSchema.create(addClientDietDto);
  }

  updateLastFollowUpDate(addedFollowUpEvent: AddedFollowUpEvent) {
    const lastFollowUpDate = new Date();
    lastFollowUpDate.setHours(0, 0, 0, 0);
    return this.clientDietSchema.findOneAndUpdate(
      {
        client: addedFollowUpEvent.client,
      },
      { lastFollowUpDate },
      { sort: { createdAt: -1 } },
    );
  }
}
