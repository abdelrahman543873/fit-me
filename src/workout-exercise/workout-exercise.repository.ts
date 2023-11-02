import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  WorkoutExercise,
  WorkoutExerciseDocument,
} from './workout-exercise.schema';
import { Model } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddWorkoutExerciseDto } from './inputs/add-workout-exercise.dto';
import { DeleteWorkoutExerciseDto } from './inputs/delete-workout-exercise.dto';
import { AddWorkoutExercisesDto } from './inputs/add-workout-exercises.dto';

@Injectable()
export class WorkoutExerciseRepository extends BaseRepository<WorkoutExercise> {
  constructor(
    @InjectModel(WorkoutExercise.name)
    private workoutExerciseSchema: Model<WorkoutExerciseDocument>,
  ) {
    super(workoutExerciseSchema);
  }

  addWorkoutExercise(addWorkoutExerciseDto: AddWorkoutExerciseDto) {
    delete addWorkoutExerciseDto.user;
    return this.workoutExerciseSchema.findOneAndUpdate(
      addWorkoutExerciseDto,
      { ...addWorkoutExerciseDto },
      { upsert: true, new: true, populate: 'exercise' },
    );
  }

  addWorkoutExercises(addWorkoutExerciseDto: AddWorkoutExercisesDto) {
    return this.workoutExerciseSchema.insertMany(
      addWorkoutExerciseDto.workoutExercises,
    );
  }

  deleteWorkoutExercise(deleteWorkoutExerciseDto: DeleteWorkoutExerciseDto) {
    return this.workoutExerciseSchema.deleteOne({
      _id: deleteWorkoutExerciseDto.id,
    });
  }
}
