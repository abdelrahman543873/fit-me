import { Injectable } from '@nestjs/common';
import { ProgramRepository } from './program.repository';
import { AddProgramDto } from './inputs/add-program.dto';
import { ObjectId } from 'mongoose';
import { UpdateProgramDto } from './inputs/update-program.dto';

@Injectable()
export class ProgramService {
  constructor(private readonly programRepository: ProgramRepository) {}

  addProgram(trainer: ObjectId, addProgramDto: AddProgramDto) {
    return this.programRepository.addProgram(trainer, addProgramDto);
  }

  deleteProgram(trainer: ObjectId, programId: ObjectId) {
    return this.programRepository.deleteProgram(trainer, programId);
  }

  updateProgram(
    trainer: ObjectId,
    programId: ObjectId,
    updateProgramDto: UpdateProgramDto,
  ) {
    return this.programRepository.updateProgram(
      trainer,
      programId,
      updateProgramDto,
    );
  }

  async filterPrograms(trainer: ObjectId) {
    return await this.programRepository.filterPrograms(trainer);
  }
}
