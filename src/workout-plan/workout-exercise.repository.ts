import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutExercise, WorkoutExerciseDocument } from './workout-exercise.schema';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddWorkoutExerciseDto } from './inputs/add-workout-exercise.dto';

@Injectable()
export class WorkoutExerciseRepository extends BaseRepository<WorkoutExercise> {
  constructor(
    @InjectModel(WorkoutExercise.name)
    private workoutExerciseSchema: Model<WorkoutExerciseDocument>,
  ) {
    super(workoutExerciseSchema);
  }

  addWorkoutExercise(addWorkoutExerciseDto: AddWorkoutExerciseDto) {
    return this.workoutExerciseSchema.create(addWorkoutExerciseDto);
  }
}
