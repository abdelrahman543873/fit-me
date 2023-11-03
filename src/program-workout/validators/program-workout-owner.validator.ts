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
import { ProgramWorkoutRepository } from '../program-workout.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ProgramWorkoutOwnerValidator
  implements ValidatorConstraintInterface
{
  constructor(private programWorkoutRepository: ProgramWorkoutRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const workoutExercise = await this.programWorkoutRepository
      .findOne({
        _id: id,
      })
      .populate(['program', 'workout']);
    if (
      workoutExercise.program['trainer'].toString() !== user._id ||
      workoutExercise.workout['trainer'].toString() !== user._id.toString()
    ) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'unauthorized program workout';
  }
}
export function IsProgramWorkoutOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ProgramWorkoutOwnerValidator,
    });
  };
}
