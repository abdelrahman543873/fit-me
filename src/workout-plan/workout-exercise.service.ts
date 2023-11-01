import { Injectable } from '@nestjs/common';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { AddWorkoutExerciseDto } from './inputs/add-workout-exercise.dto';

@Injectable()
export class WorkoutExerciseService {
  constructor(
    private readonly workoutExerciseRepository: WorkoutExerciseRepository,
  ) {}

  addWorkoutExercise(addWorkoutExerciseDto: AddWorkoutExerciseDto) {
    return this.workoutExerciseRepository.addWorkoutExercise(
      addWorkoutExerciseDto,
    );
  }
}
