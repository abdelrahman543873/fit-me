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

  deleteProgram(trainer: ObjectId, programId: ObjectId) {
    return this.programSchema.deleteOne({ trainer, _id: programId });
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
          let: { programId: '$_id' },
          as: 'workouts',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$programId', '$program'],
                },
              },
            },
            {
              $lookup: {
                from: 'workouts',
                localField: 'workout',
                foreignField: '_id',
                as: 'workout',
              },
            },
            { $unwind: '$workout' },
          ],
        },
      },
    ]);
  }
}
