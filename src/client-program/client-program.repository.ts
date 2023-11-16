import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProgram, ClientProgramDocument } from './client-program.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Model, ObjectId } from 'mongoose';
import { AddClientProgramDto } from './inputs/add-client-program.dto';

@Injectable()
export class ClientProgramRepository extends BaseRepository<ClientProgram> {
  constructor(
    @InjectModel(ClientProgram.name)
    private clientProgramSchema: Model<ClientProgramDocument>,
  ) {
    super(clientProgramSchema);
  }

  addClientProgram(addClientProgramDto: AddClientProgramDto) {
    return this.clientProgramSchema.create(addClientProgramDto);
  }

  filterClientPrograms(client: ObjectId) {
    return this.clientProgramSchema.find({ client }).populate(['program']);
  }
}
