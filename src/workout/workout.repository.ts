import { Injectable } from '@nestjs/common';
import { Workout, WorkoutDocument } from './workout.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddWorkoutDto } from './inputs/add-workout.dto';

@Injectable()
export class WorkoutRepository extends BaseRepository<Workout> {
  constructor(
    @InjectModel(Workout.name)
    private workoutSchema: Model<WorkoutDocument>,
  ) {
    super(workoutSchema);
  }

  addWorkout(trainer: ObjectId, addWorkoutDto: AddWorkoutDto) {
    return this.workoutSchema.create({ trainer, ...addWorkoutDto });
  }
}
