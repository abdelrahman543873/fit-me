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
import { ExerciseRepository } from '../exercise.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExerciseOwnerValidator implements ValidatorConstraintInterface {
  constructor(private exerciseRepository: ExerciseRepository) {}
  async validate(
    id: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user: User = JSON.parse(validationArguments.object['user']);
    const exercise = await this.exerciseRepository.findOne({
      _id: id,
      trainer: new Types.ObjectId(user._id as any),
    });
    if (!exercise) return false;
    return true;
  }

  defaultMessage() {
    return 'unauthorized exercise';
  }
}
export function IsExerciseOwner(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExerciseOwnerValidator,
    });
  };
}
