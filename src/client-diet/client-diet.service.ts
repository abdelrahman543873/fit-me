import { Injectable } from '@nestjs/common';
import { ClientDietRepository } from './client-diet.repository';
import { AddClientDietDto } from './inputs/add-client-diet.input';
import { AddedFollowUpEvent } from '../follow-up/events/added-follow-up';
import { ObjectId } from 'mongoose';
import { FilterClientDietsDto } from './inputs/filter-client-diets.input';

@Injectable()
export class ClientDietService {
  constructor(private readonly clientDietRepository: ClientDietRepository) {}

  addClientDiet(addClientDietDto: AddClientDietDto) {
    return this.clientDietRepository.addClientDiet(addClientDietDto);
  }

  updateLastFollowUpDate(addedFollowUpEvent: AddedFollowUpEvent) {
    return this.clientDietRepository.updateLastFollowUpDate(addedFollowUpEvent);
  }

  filterClientDiets(
    trainer: ObjectId,
    filterClientDietsDto: FilterClientDietsDto,
  ) {
    return this.clientDietRepository.filterClientDiets(
      trainer,
      filterClientDietsDto,
    );
  }
}
