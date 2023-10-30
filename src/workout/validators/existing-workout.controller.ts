import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { WorkoutRepository } from '../workout.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingWorkoutValidator implements ValidatorConstraintInterface {
  constructor(private workoutRepository: WorkoutRepository) {}
  async validate(id: ObjectId): Promise<boolean> {
    const workout = await this.workoutRepository.findOne({
      _id: id,
    });
    if (!workout) return false;
    return true;
  }

  defaultMessage() {
    return "this workout doesn't exist";
  }
}
export function IsExistingWorkout(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingWorkoutValidator,
    });
  };
}
