import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProgramWorkout,
  ProgramWorkoutDocument,
} from './program-workout.schema';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddProgramWorkoutsDto } from './inputs/add-program-workouts.dto';
import { DeleteProgramWorkoutDto } from './inputs/delete-program-workout.dto';

@Injectable()
export class ProgramWorkoutRepository extends BaseRepository<ProgramWorkout> {
  constructor(
    @InjectModel(ProgramWorkout.name)
    private programWorkoutSchema: Model<ProgramWorkoutDocument>,
  ) {
    super(programWorkoutSchema);
  }

  addProgramWorkouts(addProgramWorkouts: AddProgramWorkoutsDto) {
    return this.programWorkoutSchema.insertMany(
      addProgramWorkouts.programWorkouts,
    );
  }

  deleteWorkoutProgram(deleteProgramWorkoutDto: DeleteProgramWorkoutDto) {
    return this.programWorkoutSchema.deleteOne({
      _id: deleteProgramWorkoutDto.id,
    });
  }
}
