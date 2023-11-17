import { Injectable } from '@nestjs/common';
import { ClientProgramRepository } from './client-program.repository';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { ObjectId } from 'mongoose';
import { FilterClientProgramDto } from './inputs/filter-client-program.dto';

@Injectable()
export class ClientProgramService {
  constructor(
    private readonly clientProgramRepository: ClientProgramRepository,
  ) {}

  addClientProgram(addClientProgramDto: AddClientProgramDto) {
    return this.clientProgramRepository.addClientProgram(addClientProgramDto);
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
