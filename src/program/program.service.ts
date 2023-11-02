import { Injectable } from '@nestjs/common';
import { ProgramRepository } from './program.repository';
import { AddProgramDto } from './inputs/add-program.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class ProgramService {
  constructor(private readonly programRepository: ProgramRepository) {}

  addProgram(trainer: ObjectId, addProgramDto: AddProgramDto) {
    return this.programRepository.addProgram(trainer, addProgramDto);
  }
}
