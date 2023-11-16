import { Injectable } from '@nestjs/common';
import { ClientProgramRepository } from './client-program.repository';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class ClientProgramService {
  constructor(
    private readonly clientProgramRepository: ClientProgramRepository,
  ) {}

  addClientProgram(addClientProgramDto: AddClientProgramDto) {
    return this.clientProgramRepository.addClientProgram(addClientProgramDto);
  }

  filterClientPrograms(client: ObjectId) {
    return this.clientProgramRepository.filterClientPrograms(client);
  }
}
