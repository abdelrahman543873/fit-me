import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { ExerciseRepository } from '../exercise.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingExerciseValidator implements ValidatorConstraintInterface {
  constructor(private exerciseRepository: ExerciseRepository) {}
  async validate(id: ObjectId): Promise<boolean> {
    const exercise = await this.exerciseRepository.findOne({
      _id: id,
    });
    if (!exercise) return false;
    return true;
  }

  defaultMessage() {
    return "this exercise doesn't exist";
  }
}
export function IsExistingExercise(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingExerciseValidator,
    });
  };
}
