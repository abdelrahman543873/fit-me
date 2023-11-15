import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { WorkoutRepository } from '../workout.repository';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { Workout } from '../workout.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingWorkoutValidator extends ExistingEntityRecordValidator {
  constructor(workoutRepository: WorkoutRepository) {
    super(workoutRepository, Workout.name);
  }
}
export const IsExistingWorkout = isExistingEntityRecordValidator(
  ExistingWorkoutValidator,
);
