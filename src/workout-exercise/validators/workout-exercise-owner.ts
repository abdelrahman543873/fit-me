import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { User } from '../../user/user.schema';
import { WorkoutExerciseRepository } from '../workout-exercise.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class WorkoutExerciseOwnerValidator
  implements ValidatorConstraintInterface
{
  constructor(private workoutExerciseRepository: WorkoutExerciseRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const workoutExercise = await this.workoutExerciseRepository
      .findOne({
        _id: id,
      })
      .populate(['exercise', 'workout']);
    if (
      workoutExercise.exercise['trainer'].toString() !== user._id ||
      workoutExercise.workout['trainer'].toString() !== user._id.toString()
    ) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'unauthorized workout exercise';
  }
}
export function IsWorkoutExerciseOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: WorkoutExerciseOwnerValidator,
    });
  };
}
