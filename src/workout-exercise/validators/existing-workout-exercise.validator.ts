import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { WorkoutExerciseRepository } from '../workout-exercise.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingWorkoutExerciseValidator
  implements ValidatorConstraintInterface
{
  constructor(private workoutExerciseRepository: WorkoutExerciseRepository) {}
  async validate(id: ObjectId): Promise<boolean> {
    const workoutExercise = await this.workoutExerciseRepository.findOne({
      _id: id,
    });
    if (!workoutExercise) return false;
    return true;
  }

  defaultMessage() {
    return "this workout exercise doesn't exist";
  }
}
export function IsExistingWorkoutExercise(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingWorkoutExerciseValidator,
    });
  };
}
