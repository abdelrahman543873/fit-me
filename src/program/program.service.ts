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

  async getProgram(trainer: ObjectId, programId: ObjectId) {
    const programs = await this.programRepository.getProgram(
      trainer,
      programId,
    );
    if (programs.length) return programs[0];
    return null;
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
