import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { ExerciseRepository } from '../exercise.repository';
import {
  ExistingEntityRecordValidator,
  isExistingEntityRecordValidator,
} from '../../shared/validators/existing-entity-record.validator';
import { Exercise } from '../exercise.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingExerciseValidator extends ExistingEntityRecordValidator {
  constructor(exerciseRepository: ExerciseRepository) {
    super(exerciseRepository, Exercise.name);
  }
}
export const IsExistingExercise = isExistingEntityRecordValidator(
  ExistingExerciseValidator,
);
