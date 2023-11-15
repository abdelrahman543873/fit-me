import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { WorkoutExerciseRepository } from '../workout-exercise.repository';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { WorkoutExercise } from '../workout-exercise.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingWorkoutExerciseValidator extends ExistingEntityRecordValidator {
  constructor(workoutExerciseRepository: WorkoutExerciseRepository) {
    super(workoutExerciseRepository, WorkoutExercise.name);
  }
}
export const IsExistingWorkoutExercise = isExistingEntityRecordValidator(
  ExistingWorkoutExerciseValidator,
);
