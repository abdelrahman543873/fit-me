import { Injectable } from '@nestjs/common';
import { ClientProgramRepository } from './client-program.repository';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { ObjectId } from 'mongoose';
import { FilterClientProgramDto } from './inputs/filter-client-program.dto';
import { AddedFollowUpEvent } from '../follow-up/events/added-follow-up';

@Injectable()
export class ClientProgramService {
  constructor(
    private readonly clientProgramRepository: ClientProgramRepository,
  ) {}

  addClientProgram(addClientProgramDto: AddClientProgramDto) {
    return this.clientProgramRepository.addClientProgram(addClientProgramDto);
  }

  updateLastFollowUpDate(addedFollowUpEvent: AddedFollowUpEvent) {
    return this.clientProgramRepository.updateLastFollowUpDate(
      addedFollowUpEvent,
    );
  }

  filterClientPrograms(
    trainer: ObjectId,
    filterClientProgramDto: FilterClientProgramDto,
  ) {
    return this.clientProgramRepository.filterClientPrograms(
      trainer,
      filterClientProgramDto,
    );
  }
}
