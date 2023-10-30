import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { User } from '../../user/user.schema';
import { WorkoutRepository } from '../workout.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class WorkoutOwnerValidator implements ValidatorConstraintInterface {
  constructor(private workoutRepository: WorkoutRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const workout = await this.workoutRepository.findOne({
      _id: id,
      trainer: new Types.ObjectId(user._id as any),
    });
    if (!workout) return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized workout';
  }
}
export function IsWorkoutOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: WorkoutOwnerValidator,
    });
  };
}
