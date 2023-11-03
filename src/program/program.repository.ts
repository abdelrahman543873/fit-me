import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Program, ProgramDocument } from './program.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddProgramDto } from './inputs/add-program.dto';

@Injectable()
export class ProgramRepository extends BaseRepository<Program> {
  constructor(
    @InjectModel(Program.name)
    private programSchema: Model<ProgramDocument>,
  ) {
    super(programSchema);
  }

  addProgram(trainer: ObjectId, addProgramDto: AddProgramDto) {
    return this.programSchema.create({ trainer, ...addProgramDto });
  }

  filterPrograms(trainer: ObjectId) {
    return this.programSchema.aggregate([
      {
        $match: {
          trainer,
        },
      },
      {
        $lookup: {
          from: 'programworkouts',
          localField: '_id',
          foreignField: 'program',
          as: 'workouts',
        },
      },
    ]);
  }
}
